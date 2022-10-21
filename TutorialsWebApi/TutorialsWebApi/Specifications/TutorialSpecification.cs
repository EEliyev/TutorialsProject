using TutorialsWebApi.Domain.Entity;
using TutorialsWebApi.Repository;

namespace TutorialsWebApi.Specifications
{
    public class TutorialSpecification:BaseSpecification<Tutorial>
    {
        public TutorialSpecification()
        {
            AddInclude(x => x.Subjects);
        }
    }
}
