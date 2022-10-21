using TutorialsWebApi.Domain.Enums;

namespace TutorialsWebApi.Domain.Entity
{
    public class BaseEntity
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid userId { get; set; }
        public RecordStatus RecordStatus { get; set; }
        public DateTime CreateAt { get; set; }= DateTime.Now;
    }
}
