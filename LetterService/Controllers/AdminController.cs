using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LetterService.Controllers;
[Route("api")]
[ApiController]
public class AdminController : ControllerBase
{
    [HttpGet("user/letter")]
    public async Task<ActionResult> GetAllUsersMessagesAsync()
    {
        return Ok();
    }
}
