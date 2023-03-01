﻿using LetterService.DAL.Entities;
using LetterService.Models.DTO;
using LetterService.Services.Security.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace LetterService.Controllers;
[Route("api/user")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly LetterServiceDbContext _context;
    private readonly ILogin _loginService;
    public UserController(LetterServiceDbContext context, ILogin loginService) =>
        (_context, _loginService) = (context, loginService);

    [HttpPost("login")]
    public async Task<ActionResult> LoginAsync(
        [FromBody] UserDto model
    )
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
        if (user is null)
            return BadRequest(new 
            {
                message = "Not valid credentials",
                user = model.Email
            });

        var token  = _loginService.Login(user, model.Password);

        if (token.IsNullOrEmpty())
            return BadRequest(new 
            {
                message = "Not valid credentials",
                user = model.Email
            });


        return Ok(new { message = $"User: {model.Email}: Seccessful verified", token=token });
    }

    [HttpPost("register")]
    public async Task<ActionResult> RegisterAsync()
    {
        return Ok();
    }
}