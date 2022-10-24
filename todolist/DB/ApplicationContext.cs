using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todolist.Entities;

namespace todolist.DB
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Todo> Todos { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var user = new User
            {
                Id = 1,
                Name = "Ydgin",
                Email = "test@gmail.com",
                Password = "12345"
            };

            modelBuilder.Entity<User>().HasData(user);
            var todoList = new List<Todo>()
            {
                new Todo{Id =1,UserId=1,isDone=true,Content="Add EF Core"},
                new Todo{Id =2,UserId=1,isDone=true,Content="Add JWT"},
                new Todo{Id =3,UserId=1,isDone=false,Content="Поднастроить UI"},

            };
            modelBuilder.Entity<Todo>().HasData(todoList);
        }
    }
}
