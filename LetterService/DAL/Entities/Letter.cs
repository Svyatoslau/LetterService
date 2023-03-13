using System.ComponentModel.DataAnnotations;

namespace LetterService.DAL.Entities;

public class Letter
{
    public int Id { get; set; }
    public required DateTime PostTime { get; set; }
    public required string Topic { get; set; }
    public required string Body { get; set; }
    public required bool IsPosted { get; set; }
    public required DateTime CreationTime { get; set; }
    public required int UserId { get; set; }
    public virtual User? User { get; set; }
}
