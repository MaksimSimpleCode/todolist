using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace todolist.Entities
{
    public class User
    {
        public int Id { get; set; }
        public int Email { get; set; }
        public int Password { get; set; }
        public int Name { get; set; }
    }
}
