using AutoMapper;
using LetterService.Attributes;
using LetterService.DAL.Entities;
using LetterService.Models;
using LetterService.Models.API;
using LetterService.Models.DTO;
using LetterService.Services;
using LetterService.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;
using System.Security.Claims;

namespace LetterService.Controllers;
[Route("api/user/{userId}")]
[ApiController]
[AuthorizeRoles(Role.Admin, Role.User)]
public class LetterController : ControllerBase
{
    private readonly LetterServiceDbContext _context;
    private readonly IMapper _mapper;
    private readonly ICRUDLetter _letterService;
    public LetterController(LetterServiceDbContext context, IMapper mapper, ICRUDLetter letterService) =>
        (_context, _mapper, _letterService) = (context, mapper, letterService);

    [HttpGet("letters")]
    public async Task<ActionResult> GetAllLettersAsync(
        [FromRoute] int userId
    )
    {
        bool IsValidUser = await VerifyUserAsync(userId);
        if (!IsValidUser)
        {
            return BadRequest(new { message = "Access denied" });
        }
        var letters = await _context.Letters
            .Where(l => l.UserId == userId)
            .OrderBy(l => l.PostTime)
            .ToListAsync();
        var lettersDto = _mapper.Map<IEnumerable<LetterDto>>(letters);
        return Ok(lettersDto);
    }

    [HttpPost("letter")]
    public async Task<ActionResult> CreateLetterAsync(
        [FromRoute] int userId,
        [FromBody] LetterForCreate model
    )
    {
        bool IsValidUser = await VerifyUserAsync(userId);
        if (!IsValidUser)
        {
            return BadRequest(new { message = "Access denied" });
        }
        var letter = _letterService.Create(model, userId);
        await _context.Letters.AddAsync(letter);
        await _context.SaveChangesAsync();
        var createdLetterDto = _mapper.Map<LetterDto>(letter);
        return Ok(createdLetterDto);
    }

    [HttpPut("letter/{letterId}")]
    public async Task<ActionResult> UpdateLetterAsync(
        [FromBody] LetterForCreate model,
        [FromRoute] int letterId,
        [FromRoute] int userId
    )
    {
        bool IsValidUser = await VerifyUserAsync(userId);
        if (!IsValidUser)
        {
            return BadRequest(new { message = "Access denied" });
        }
        var letter = await _context.Letters.FirstOrDefaultAsync(l => l.Id == letterId);
        if (letter is null)
        {
            return NotFound(new { message = $"Letter with id {letterId} Not Found" });
        }
        _letterService.Update(letter, model);
        await _context.SaveChangesAsync();
        var updateLetterDto = _mapper.Map<LetterDto>(letter);

        return Ok(updateLetterDto);
    }

    [HttpDelete("letter/{letterId}")]
    public async Task<ActionResult> DeleteLetterAsync(
        [FromRoute] int userId,
        [FromRoute] int letterId
    )
    {
        bool IsValidUser = await VerifyUserAsync(userId);
        if (!IsValidUser)
        {
            return BadRequest(new { message = "Access denied" });
        }
        var letter = _context.Letters.FirstOrDefault(l => l.Id == letterId);
        if (letter is null)
        {
            return NotFound(new { message = $"Letter with id {letterId} not found" });
        }
        _context.Letters.Remove(letter);
        await _context.SaveChangesAsync();
        var letterDto = _mapper.Map<LetterDto>(letter);
        return Ok(letterDto);
    }
    private async Task<bool> VerifyUserAsync(int userId)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(user => user.Id == userId);
        if (user is null)
        {
            return false;
        }

        if (HttpContext.User.IsInRole(Role.Admin.ToString()))
        {
            return true;
        }
        string email = HttpContext.User.FindFirst(ClaimsIdentity.DefaultNameClaimType)!.Value;

        if (email != user.Email)
        {
            return false;
        }
        return true;
    }
}
