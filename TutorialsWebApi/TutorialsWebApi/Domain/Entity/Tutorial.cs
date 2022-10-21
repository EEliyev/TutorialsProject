namespace TutorialsWebApi.Domain.Entity
{
    public class Tutorial:BaseEntity
    {
        public string Name { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Text { get; set; }
        public ICollection<Subject>? Subjects { get; set; }
    }
}
