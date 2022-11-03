using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;
using TutorialsWebApi.Configuration;
using TutorialsWebApi.Domain.Dto;
using TutorialsWebApi.Domain.Entity;

namespace TutorialsWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IdentityController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly JwtConfig jwtConfig;

        public IdentityController(UserManager<User> userManager,RoleManager<IdentityRole> roleManager,IOptionsMonitor<JwtConfig> optionsMonitor)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.jwtConfig = optionsMonitor.CurrentValue;
        }
        [HttpGet]
        [Route("checkusernameexist")]
        public async Task<IActionResult> Checkusernameexist([FromQuery] string name)
        {
            if (name != null)
            {
                var data = await userManager.FindByNameAsync(name);
                if (data != null)
                {
                    return Ok(new {success=true});
                }
                return Ok(new {success=false});

            }
            
            return BadRequest();
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDto model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest(new SystemReponseMessage()
                {
                    success = false,
                    errors = new List<string>() { "Email or password is wrong" }
                });
            }
            return Ok(new SystemReponseMessage()
            {
                success=true,
                token=await GenerateJwtToken(user)
            });

        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterDto model)
        {

            var existingUser = await userManager.FindByEmailAsync(model.Email);
            if(existingUser != null)
            {
                return BadRequest(new SystemReponseMessage()
                {
                    errors = new List<string>()
                {
                    "Email already is used"
                }
                });
            }

            var newUser = new User()
            {
                UserName = model.UserName,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };

            var result = await userManager.CreateAsync(newUser, model.Password);
            if (result.Succeeded)
            {
                await userManager.AddToRoleAsync(newUser,"User");
                //var code = await userManager.GenerateEmailConfirmationTokenAsync(newUser);

                //var callbackUrl = Request.Scheme + "://" + Request.Host + Url.Action("ConfirmEmail", "Identity", new {userId=newUser.Id,code=code});
                //var emailBody = $"Please confirm your email <a href='{HtmlEncoder.Default.Encode(callbackUrl)}'>Click Here</a>";

                //SendEmail(emailBody,"");

                return Ok(new SystemReponseMessage()
                {
                    token=await GenerateJwtToken(newUser),
                    success = true
                });
            }
            else
            {
                return BadRequest(new SystemReponseMessage()
                {
                    errors = result.Errors.Select(x => x.Description).ToList(),
                    success = false
                });
            }

            
        }
        private async Task<string> GenerateJwtToken(User user)
        {
            var role = await userManager.GetRolesAsync(user);
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(jwtConfig.Secret);

            var claims = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                });

            foreach (var item in role)
            {
                claims.AddClaim(new Claim(ClaimTypes.Role, item));
            }

            var tokenDecriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddMinutes(10),
                SigningCredentials= new SigningCredentials(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtTokenHandler.CreateToken(tokenDecriptor);
            var jwt = jwtTokenHandler.WriteToken(token);

            return jwt;

        }
        private void SendEmail(string body,string email)
        {
            
        }
    }
}
