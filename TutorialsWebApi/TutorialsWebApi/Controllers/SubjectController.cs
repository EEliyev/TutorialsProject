using Microsoft.AspNetCore.Mvc;
using TutorialsWebApi.Domain.Entity;
using TutorialsWebApi.Services;

namespace TutorialsWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SubjectController : ControllerBase
    {
        private readonly IServiceFactory serviceFactory;

        public SubjectController(IServiceFactory serviceFactory)
        {
            this.serviceFactory = serviceFactory;
        }
        [HttpPost]
        [Route("createSubject")]
        public async Task<IActionResult> GetSubjects(Subject model)
        {
            var subRepo = serviceFactory.SubjectService;

            await subRepo.Add(model);
            await subRepo.SaveAsync();

            return Ok(new {message=$"{model.Name} is created succesfully"});
        }
        [HttpDelete]
        [Route("deleteSubject/{id}")]
        public async Task<IActionResult> DeleteSubject(Guid id)
        {
            var subRepo = serviceFactory.SubjectService;

            var data = await subRepo.GetById(id);
            if (data == null)
            {
                return BadRequest(new { message = "Subject does not exist " });
            }

            await subRepo.Delete(data);
            await subRepo.SaveAsync();
            return Ok(new { message="Subject is deleted succesfully"});
        }
    }
}
