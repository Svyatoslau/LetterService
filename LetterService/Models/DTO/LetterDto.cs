using LetterService.DAL.Entities;

namespace LetterService.Models.DTO;

public class LetterDto
{
    public int Id { get; set; }
    public string? Topic { get; set; }
    public string? Body { get; set; }
    public DateTime PostTime { get; set; }
    public required string Emails { get; set; }
    public bool IsPosted { get; set; }
}
