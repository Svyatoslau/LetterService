using AutoMapper;
using LetterService.DAL.Entities;
using LetterService.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LetterService.Controllers;
[Route("api")]
[ApiController]
[Authorize(Roles ="admin")]
public class AdminController : ControllerBase
{
    private readonly LetterServiceDbContext _context;
    private readonly IMapper _mapper;

    public AdminController(LetterServiceDbContext context, IMapper mapper) =>
        (_context, _mapper) = (context, mapper);

    [HttpGet("user/letter")]
    public async Task<ActionResult> GetAllUsersLettersAsync()
    {
        // подумать как лучше сделать
        var lettersDto = await _context.Users
            .GroupJoin(
                _context.Letters,
                u => u.Id,
                l => l.UserId,
                (user, letters) => new
                {
                    User = _mapper.Map<UserDto>(user),
                    Letters = _mapper.Map<IEnumerable<LetterDto>>(letters)
                }
            )
            .ToListAsync();

        return Ok(lettersDto);
    }
}
