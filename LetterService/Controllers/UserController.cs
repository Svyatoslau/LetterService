using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LetterService.Controllers;
[Route("api/user")]
[ApiController]
public class UserController : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult> LoginAsync()
    {
        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult> RegisterAsync()
    {
        return Ok();
    }


}
