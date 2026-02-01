using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Common.Entities;
using Common.Persistance;

namespace Common.Services
{
    public class BaseService<TEntity, TRequest, TResponse>
        where TEntity : BaseEntity
    {
        protected readonly AppDbContext _db;
        protected readonly IMapper _mapper;
        protected readonly DbSet<TEntity> _dbSet;

        protected BaseService(AppDbContext dbContext, IMapper mapper)
        {
            _db = dbContext;
            _mapper = mapper;
            _dbSet = _db.Set<TEntity>();
        }
        public virtual List<TResponse> GetAll()
        {
            // AsNoTracking - read only optimization
            var entities = _dbSet.AsNoTracking().ToList();
            return _mapper.Map<List<TResponse>>(entities);
        }

        public virtual TResponse GetById(int id)
        {
            var entity = _dbSet.Find(id);
            if (entity == null)
                return default!;

            return _mapper.Map<TResponse>(entity);
        }

        public virtual TResponse Create(TRequest request)
        {
            var entity = _mapper.Map<TEntity>(request);
            _dbSet.Add(entity);
            _db.SaveChanges();
            return _mapper.Map<TResponse>(entity);
        }

        public virtual TResponse Update(int id, TRequest request)
        {
            var entity = _dbSet.Find(id);
            if (entity == null)
                return default!;

            _mapper.Map(request, entity);
            _dbSet.Update(entity);
            _db.SaveChanges();
            return _mapper.Map<TResponse>(entity);
        }

        public virtual void Delete(int id)
        {
            var entity = _dbSet.Find(id);
            if (entity == null)
                return;

            _dbSet.Remove(entity);
            _db.SaveChanges();
        }

        public virtual int? GetOwnerId(int id)
        {
            return null;
        }
    }
}
