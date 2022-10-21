using TutorialsWebApi.Repository;

namespace TutorialsWebApi.Services
{
    public interface IServiceFactory
    {
        public TutorialService TutorialService { get; }
        public SubjectService SubjectService { get; }
    }
    public class ServiceFactory : IServiceFactory
    {
        public ServiceFactory(IRepositoryFactory factory)
        {
            this.factory = factory;
        }
        private TutorialService _tutorialService;
        private readonly Repository.IRepositoryFactory factory;

        public TutorialService TutorialService {
            get {
                this._tutorialService ??= new TutorialService(factory);
                return _tutorialService;
            } 
        }
        private SubjectService _subjectService;
        public SubjectService SubjectService {
            get
            {
                this._subjectService??=new SubjectService(factory);
                return _subjectService;
            }
        }
    }
}
