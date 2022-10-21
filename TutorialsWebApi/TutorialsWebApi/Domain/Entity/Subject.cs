namespace TutorialsWebApi.Domain.Entity
{
    public class Subject:BaseEntity
    {
        public string  Name { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public Guid tutorialId { get; set; }
        public Tutorial? Tutorial { get; set; }
    }
}
