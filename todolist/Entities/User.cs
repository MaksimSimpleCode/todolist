using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace todolist.Entities
{
    public class User
    {
        public User()
        {
            Todos = new List<Todo>();
        }
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public ICollection<Todo> Todos { get; set; }
    }
}
