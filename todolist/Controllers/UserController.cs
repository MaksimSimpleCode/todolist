using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using todolist.DB;
using todolist.Entities;

namespace todolist.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly ILogger<UserController> _logger;
        private readonly ApplicationContext _db;
        public UserController(ApplicationContext db, ILogger<UserController> logger)
        {
            _db = db;
            _logger = logger;
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] User loginData)
        {

            User? user = _db.Users.FirstOrDefault(p => p.Email == loginData.Email && p.Password == loginData.Password);
            // если пользователь не найден, отправляем статусный код 401
            if (user is null) return Unauthorized("Не авторизован");

            var claims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };
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
                username = user.Email
            };

            return Json(response);
        }
        [HttpPost]
        [Route("Register")]
        public IActionResult Register([FromBody] User registerData)
        {

            User? newUser = new User
            {
                Email = registerData.Email,
                Password = registerData.Password,
                Name = registerData.Name
            };

            var user = _db.Users.Add(newUser);
            _db.SaveChanges();

            var claims = new List<Claim> {
                new Claim(ClaimTypes.Name, newUser.Email),
                new Claim(ClaimTypes.NameIdentifier,newUser.Id.ToString())
            };
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
                username = newUser.Email
            };

            return Json(response);
        }
    }
}
