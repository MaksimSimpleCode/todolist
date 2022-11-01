using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using todolist.DB;
using todolist.Entities;

namespace todolist.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoController : Controller
    {
        private readonly ILogger<TodoController> _logger;
        private readonly ApplicationContext _db;

        public TodoController(ApplicationContext db, ILogger<TodoController> logger)
        {
            _db = db;
            _logger = logger;
        }

        [HttpGet]
        [Authorize]
        [Route("GetTodo")]
        public JsonResult GetTodo()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            List<Todo> todoList = _db.Todos.Where(l => l.UserId == Int32.Parse(userId)).ToList();
            return Json(todoList);
        }

        [HttpPost]
        [Authorize]
        [Route("Create")]
        public  JsonResult Create([FromBody] Todo todo)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var user = _db.Users.FirstOrDefault(u => u.Id == Int32.Parse(userId));

            var newTodo = new Todo { Content = todo.Content, isDone = todo.isDone,User=user };
            _db.Todos.Add(newTodo);
            _db.SaveChanges();
          

            return Json(newTodo.Id);
        }

        [HttpPost]
        [Authorize]
        [Route("Change")]
        public async Task<IActionResult> Change([FromBody] Todo todo)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var updateTodo = _db.Todos.FirstOrDefault(t => t.Id == todo.Id);
           
            if (updateTodo != null)
            {
                updateTodo.Content = todo.Content;
                updateTodo.isDone = todo.isDone;
                _db.Todos.Update(updateTodo);
               await _db.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }

        [HttpPost]
        [Authorize]
        [Route("Delete")]
        public async Task<IActionResult>  Delete([FromBody] Todo todo)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var user = _db.Users.FirstOrDefault(u => u.Id == Int32.Parse(userId));

            var deleteTodo = _db.Todos.FirstOrDefault(t => t.Id ==todo.Id);
            _db.Todos.Remove(deleteTodo);
            await _db.SaveChangesAsync();
            return Ok(deleteTodo.Id);
        }
    }
}
