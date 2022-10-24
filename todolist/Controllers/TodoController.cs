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
        public async Task<IActionResult> Create(string content)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;
            var user = _db.Users.FirstOrDefault(u => u.Id == Int32.Parse(userId));
            user.Todos.Add(new Todo { Content = content, isDone = false });
            await _db.SaveChangesAsync();

            return Ok();
        }
    }
}
