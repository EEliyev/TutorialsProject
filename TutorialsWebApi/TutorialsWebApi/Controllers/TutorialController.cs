using Microsoft.AspNetCore.Mvc;
using TutorialsWebApi.Domain.Entity;
using TutorialsWebApi.Services;
using TutorialsWebApi.Specifications;

namespace TutorialsWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TutorialController : ControllerBase
    {
        private readonly IServiceFactory serviceFactory;

        public TutorialController(IServiceFactory serviceFactory)
        {
            this.serviceFactory = serviceFactory;
        }
        [HttpGet]
        [Route("GetTutorials")]
        public async Task<IActionResult> GetAllTutorials()
        {
            var tutorialsRepo = serviceFactory.TutorialService;
            var data = await tutorialsRepo.GetAll(new TutorialSpecification());
            foreach (var item in data)
            {
                if (item.Subjects == null)
                {
                    item.Subjects= new List<Subject>();
                }
            };
            return Ok(data);
        }
        [HttpGet]
        [Route("GetById/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var tutorialsRepo = serviceFactory.TutorialService;
            var data = await tutorialsRepo.GetById(id,new TutorialSpecification());

            if(data == null)
            {
                return BadRequest(new { message = "This tutorial does not exist" });
            }
            return Ok(data);
        }
        [HttpPost]
        [Route("CreateTutorial")]
        public async Task<IActionResult> CreateTutorial(Tutorial model)
        {
            var tutorialRepo= serviceFactory.TutorialService;

            var data = new Tutorial()
            {
                Name = model.Name,
                Text = model.Text,
                Url = model.Url,
                Title = model.Title,
            };

            await tutorialRepo.Add(model);
            await tutorialRepo.SaveAsync();
            return Ok(new { message=$"{model.Name} is created succesfully"});
        }
        [HttpPut]
        [Route("EditTutorial/{id}")]
        public async Task<IActionResult> EditTutorial(Guid id, Tutorial model)
        {
            var tutorialRepo = serviceFactory.TutorialService;
            var data = await tutorialRepo.GetById(id);

            if (data == null)
            {
                return BadRequest(new {message="Data does not exist"});
            }
            data.Name = model.Name;
            data.Text = model.Text;
            data.Url = model.Url;
            data.Title = model.Title;
            await tutorialRepo.Update(data);
            await tutorialRepo.SaveAsync();
            return Ok(new {message="Data updated succesfully"});

        }
        [HttpDelete]
        [Route("DeleteTutorial/{id}")]
        public async Task<IActionResult> DeleteTutorial(Guid id)
        {
            var tutorialRepo = serviceFactory.TutorialService;

            var data = await tutorialRepo.GetById(id,new TutorialSpecification());
            if(data == null)
            {
                return BadRequest(new { message = "This tutorial does not exist" });
            }
            Console.WriteLine(data.Subjects.Count);
            if (data.Subjects?.Count > 0)
            {
                return BadRequest(new {message="This tutorial have subject, you cant delete this"});
            }
            await tutorialRepo.Delete(data);
            await tutorialRepo.SaveAsync();
            return Ok(new {message=$"{data.Name} is deleted succesfully"});
        }
    }
}
