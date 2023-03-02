using AutoMapper;
using LetterService.DAL.Entities;
using LetterService.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LetterService.Controllers;
[Route("api/user/{userId}/letter")]
[ApiController]
[Authorize(Roles = "user, admin")]
public class LetterController : ControllerBase
{
    private readonly LetterServiceDbContext _context;
    private readonly IMapper _mapper;

    public LetterController(LetterServiceDbContext context, IMapper mapper) =>
        (_context, _mapper) = (context, mapper);

    [HttpGet]
    public async Task<ActionResult> GetAllLettersAsync(
        [FromRoute] int userId    
    )
    {
        var letters = await _context.Letters
            .Where(l => l.UserId == userId)
            .OrderBy(l => l.PostTime)
            .ToListAsync();

        var lettersDto = _mapper.Map<IEnumerable<LetterDto>>(letters);

        return Ok(lettersDto);
    }

    [HttpPost]
    public async Task<ActionResult> CreateLetterAsync()
    {
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateLetterAsync(
        [FromBody] LetterDto model
    )
    {
        var letter = await _context.Letters.FirstOrDefaultAsync(l => l.Id == model.Id);
        if (letter is null)
        {
            return NotFound(new { message = $"Letter with id {model.Id} Not Foud" });
        }

        
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteLetterAsync()
    {
        return Ok();
    }


}
