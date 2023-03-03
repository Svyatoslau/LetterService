using AutoMapper;
using LetterService.DAL.Entities;
using LetterService.Models.API;
using LetterService.Models.DTO;
using LetterService.Services.Security;
using LetterService.Services.Security.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.IdentityModel.Tokens;

namespace LetterService.Controllers;
[Route("api/user")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly LetterServiceDbContext _context;
    private readonly ILogin _loginService;
    private readonly IRegister _registerService;
    private readonly IMapper _mapper;
    public UserController(LetterServiceDbContext context, ILogin loginService, IRegister registerService, IMapper mapper) =>
        (_context, _loginService, _registerService, _mapper) = (context, loginService, registerService, mapper);

    [HttpPost("login")]
    public async Task<ActionResult> LoginAsync(
        [FromBody] UserApiModel model
    )
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
        if (user is null)
        {
            return BadRequest(new BadLogin { User = model.Email });
        }

        var token  = _loginService.Login(user, model.Password);
        if (token.IsNullOrEmpty())
        {
            return BadRequest(new BadLogin { User = model.Email });
        }
        
        var userDto = _mapper.Map<UserDto>(user);

        return Ok(new
        {
            User = userDto,
            Token = token,
        });
    }

    [HttpPost("register")]
    public async Task<ActionResult> RegisterAsync(
        [FromBody] UserApiModel model
    )
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
        if (user is not null)
        {
            return BadRequest(new { message = $"EROR user: {model.Email} Exists" });
        }
            

        User newUser = _registerService.CreateUser(model, Models.Role.User);
        
        await _context.AddAsync(newUser);
        await _context.SaveChangesAsync();

        var newUserDto = _mapper.Map<UserDto>(newUser);

        return Ok(newUserDto);
    }
}
