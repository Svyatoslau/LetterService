using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LetterService.Controllers;
[Route("api")]
[ApiController]
[Authorize(Roles ="admin")]
public class AdminController : ControllerBase
{
    [HttpGet("user/letter")]
    public async Task<ActionResult> GetAllUsersLettersAsync()
    {
        return Ok();
    }
}
