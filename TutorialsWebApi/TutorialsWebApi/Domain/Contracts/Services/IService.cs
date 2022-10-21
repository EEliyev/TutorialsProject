using TutorialsWebApi.Domain.Contracts.Repositories;

namespace TutorialsWebApi.Domain.Contracts.Services
{
    public interface IService<T>
    {
        Task<IEnumerable<T>> GetAll(ISpecification<T> spec);
        Task<T> GetById(Guid Id, ISpecification<T> spec=null);
        Task Add(T entity);
        Task Update(T entity);
        Task Delete(T entity);
        Task<int> SaveAsync();
    }
}
