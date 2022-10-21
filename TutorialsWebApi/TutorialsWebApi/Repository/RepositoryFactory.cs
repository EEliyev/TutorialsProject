using TutorialsWebApi.Domain.Contexts;
using TutorialsWebApi.Domain.Contracts.Repositories;

namespace TutorialsWebApi.Repository
{
    public interface IRepositoryFactory
    {
        public IRepository Repository { get; }
        Task<int> SaveAsync();

    }
    public class RepositoryFactory : IRepositoryFactory,IDisposable
    {
        public RepositoryFactory(TutorialContext context,IRepository repository)
        {
            this.context = context;
            Repository = repository;
        }
        public IRepository Repository { get; }

        
        public async Task<int> SaveAsync()
        {
            try
            {
                int result = await context.SaveChangesAsync();

                return result;

            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

        }
        private bool _disposed = false;
        private readonly TutorialContext context;

        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this._disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}
