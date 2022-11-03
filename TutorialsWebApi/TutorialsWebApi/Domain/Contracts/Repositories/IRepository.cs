using TutorialsWebApi.Domain.Entity;

namespace TutorialsWebApi.Domain.Contracts.Repositories
{
    public interface IRepository
    {
        Task<IEnumerable<T>> GetAll<T>(ISpecification<T> spec) where T:BaseEntity;
        Task<T> GetById<T>(Guid Id,ISpecification<T> spec=null) where T : BaseEntity;
        Task Add<T>(T entity)where T : class;
        Task Update<T>(T entity) where T:class;
        Task Delete<T>(T entity) where  T:class;
        Task SaveAsync();
    }
}
