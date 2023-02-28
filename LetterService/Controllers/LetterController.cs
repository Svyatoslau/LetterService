﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LetterService.Controllers;
[Route("api/user/{userId}/letter")]
[ApiController]
public class LetterController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetAllLettersAsync()
    {
        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult> CreateLetterAsync()
    {
        return Ok();
    }
}
