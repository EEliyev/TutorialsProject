namespace TutorialsWebApi.Domain.Dto
{
    public class SystemReponseMessage
    {
        public bool success { get; set; }
        public List<string> errors { get; set; }
        public string token { get; set; }
    }
}
