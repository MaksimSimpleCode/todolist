using System.Collections.Generic;
using System.Threading.Tasks;
using todolist.Entities;
using todolist.Models;

namespace todolist.Service
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        Task<AuthenticateResponse> Register(UserModel userModel);
        IEnumerable<User> GetAll();
        User GetById(int id);
    }
}
