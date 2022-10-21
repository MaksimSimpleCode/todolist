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
    public class WeatherForecastController : Controller
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }


        [HttpGet]
        [Authorize]
        [Route("Data")]
        public JsonResult Data()
        {
            return Json(new { Data = "secret data...." });
        }


        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] Person loginData)
        {
          var  people = new List<Person>
             {
                new Person("tom@gmail.com", "12345"),
                new Person("bob@gmail.com", "55555")
           
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
}
