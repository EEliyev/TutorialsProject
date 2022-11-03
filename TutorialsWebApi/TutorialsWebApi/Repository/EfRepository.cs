using Microsoft.EntityFrameworkCore;
using TutorialsWebApi.Domain.Contexts;
using TutorialsWebApi.Domain.Contracts.Repositories;
using TutorialsWebApi.Domain.Entity;

namespace TutorialsWebApi.Repository
{
    public class EfRepository : IRepository 
    {
        private readonly TutorialContext context;

        public EfRepository(TutorialContext context)
        {
            this.context = context;
        }
        public async Task Add<T>(T entity) where T : class
        {
            await context.Set<T>().AddAsync(entity);
        }

        public async Task Delete<T>(T entity) where T: class
        {
            context.Set<T>().Remove(entity);
        }

        public async Task<IEnumerable<T>> GetAll<T>(ISpecification<T> spec) where T : BaseEntity
        {
            var query =  context.Set<T>().AsQueryable();
            if(spec!=null)
            {
                if (spec.Includes.Count > 0)
                {
                    query = spec.Includes
                                .Aggregate(query,
                                    (current, include) => current.Include(include));
                }
            }
           
            return await query.OrderBy(x=>x.CreateAt).ToListAsync();
        }

        public async Task<T> GetById<T>(Guid Id, ISpecification<T> spec=null) where T: BaseEntity
        {
            var query = context.Set<T>().AsQueryable();

            if (spec != null)
            {
                if (spec.Includes.Count > 0)
                {
                    query = spec.Includes
                                .Aggregate(query,
                                    (current, include) => current.Include(include));
                }
            }
          
                
            return await query.OrderBy(x=>x.CreateAt).FirstOrDefaultAsync(x=>x.Id==Id);
        }

        public async Task SaveAsync()
        {
            await context.SaveChangesAsync();
        }

        public async Task Update<T>(T entity) where T:class
        {
            context.Entry<T>(entity).State = EntityState.Modified;
        }
    }
}
