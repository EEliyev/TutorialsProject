using TutorialsWebApi.Domain.Contracts.Repositories;
using TutorialsWebApi.Domain.Contracts.Services;
using TutorialsWebApi.Domain.Entity;
using TutorialsWebApi.Repository;

namespace TutorialsWebApi.Services
{
    public class SubjectService : ISubject
    {
        private readonly IRepositoryFactory repositoryFactory;

        public SubjectService(IRepositoryFactory repositoryFactory)
        {
            this.repositoryFactory = repositoryFactory;
        }
        public async Task Add(Subject entity)
        {
            await repositoryFactory.Repository.Add<Subject>(entity);
        }

        public async Task Delete(Subject entity)
        {
            await repositoryFactory.Repository.Delete<Subject>(entity);
        }

        public async Task<IEnumerable<Subject>> GetAll(ISpecification<Subject> spec=null)
        {
            return await repositoryFactory.Repository.GetAll<Subject>(spec);
        }

        public async Task<Subject> GetById(Guid Id,ISpecification<Subject>? spec=null)
        {
            return await repositoryFactory.Repository.GetById<Subject>(Id,spec);
        }

        public async Task<int> SaveAsync()
        {
            return await repositoryFactory.SaveAsync();
        }

        public async Task Update(Subject entity)
        {
            await repositoryFactory.Repository.Update(entity);
        }
    }
}
