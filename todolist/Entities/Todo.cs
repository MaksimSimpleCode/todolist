using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace todolist.Entities
{
    public class Todo
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public bool isDone { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
