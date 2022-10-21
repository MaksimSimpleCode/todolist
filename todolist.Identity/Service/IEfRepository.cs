using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using todolist.Entities;

namespace todolist.Service
{
    public interface IEfRepository<T> where T : BaseEntity
    {
        List<T> GetAll();
        T GetById(long id);
        Task<long> Add(T entity);
    }
}
