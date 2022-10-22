using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;

namespace todolist.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }


        [HttpGet]
        [Authorize]
        [Route("Data")]
        public JsonResult Data()
        {
            var currentUser = User.Claims;
            //По идее так получим имя
            var getCurrentUserName = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;

            return Json(new { Data = $"secret data....\nyou name is: {getCurrentUserName}" });
        }



        [HttpGet]
        [Authorize]
        [Route("Todo")]
        public JsonResult GetTodo()
        {
            var currentUser = User.Claims;
            //По идее так получим имя
            var getCurrentUserName = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name).Value;

            var todoListMok = new List<Todo>() {
                new Todo { Content = $"затестил fetch для пользователя {getCurrentUserName}", isDo = true },
             new Todo { Content = $"и еще тест {getCurrentUserName}", isDo = false }
            };

            return Json(todoListMok);
        }




        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] Person loginData)
        {
            var people = new List<Person>
             {
                new Person("tom@gmail.com", "12345"),
                new Person("bob@gmail.com", "12345")
          };
            // находим пользователя 
            Person? person = people.FirstOrDefault(p => p.Email == loginData.Email && p.Password == loginData.Password);
            // если пользователь не найден, отправляем статусный код 401
            if (person is null) return Unauthorized("Не авторизован");

            var claims = new List<Claim> { new Claim(ClaimTypes.Name, person.Email) };
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    claims: claims,
                    expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(2)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            // формируем ответ
            var response = new
            {
                access_token = encodedJwt,
                username = person.Email
            };

            return Json(response);
        }
    }
    public class Person
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public Person(string Email, string Password)
        {
            this.Email = Email;
            this.Password = Password;
        }
    }

    public class Todo
    {
        public string Content { get; set; }
        public bool isDo { get; set; }

    }
}
