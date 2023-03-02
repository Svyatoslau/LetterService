using LetterService.DAL.Entities;

namespace LetterService.Models.DTO;

public class LetterDto
{
    public int Id { get; set; }
    public DateTime PostTime { get; set; }
    public string Message { get; set; } = null!;
    public DateTime CreationTime { get; set; }
}
