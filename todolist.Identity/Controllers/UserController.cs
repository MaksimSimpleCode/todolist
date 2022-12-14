//using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using todolist.Helpers;
using todolist.Models;
using todolist.Service;

namespace todolist.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }
        //[HttpPost("register")]
        //public async Task<IActionResult> Register(UserModel userModel)
        //{
        //    var response = await _userService.Register(userModel);

        //    if (response == null)
        //    {
        //        return BadRequest(new { message = "Didn't register!" });
        //    }

        //    return Ok(response);
        //}


        [HttpGet]
        [Authorize]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }
    }
}
