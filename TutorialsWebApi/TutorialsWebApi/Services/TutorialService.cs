using TutorialsWebApi.Domain.Contracts.Repositories;
using TutorialsWebApi.Domain.Contracts.Services;
using TutorialsWebApi.Domain.Entity;
using TutorialsWebApi.Repository;

namespace TutorialsWebApi.Services
{
    public class TutorialService : ITutorial
    {
        private readonly Repository.IRepositoryFactory repositoryFactory;

        public TutorialService(IRepositoryFactory repositoryFactory)
        {
            this.repositoryFactory = repositoryFactory;
        }
        public async Task Add(Tutorial entity)
        {
            await repositoryFactory.Repository.Add<Tutorial>(entity);
        }

        public async Task Delete(Tutorial entity)
        {
            await repositoryFactory.Repository.Delete<Tutorial>(entity);
        }

        public async Task<IEnumerable<Tutorial>> GetAll(ISpecification<Tutorial> spec=null)
        {
            return await repositoryFactory.Repository.GetAll<Tutorial>(spec);
        }

        public async Task<Tutorial> GetById(Guid Id,ISpecification<Tutorial> spec=null)
        {
            return await repositoryFactory.Repository.GetById<Tutorial>(Id,spec);
        }

        public async Task<int> SaveAsync()
        {
            return await repositoryFactory.SaveAsync();
        }

        public async Task Update(Tutorial entity)
        {
            await repositoryFactory.Repository.Update<Tutorial>(entity);
        }
    }
}
