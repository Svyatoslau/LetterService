using System.ComponentModel.DataAnnotations;

namespace LetterService.DAL.Entities;

public class Letter
{
    public int Id { get; set; }
    [Required]
    public DateTime PostTime { get; set; }
    [Required]
    public string? Topic { get; set; }
    [Required]
    public string? Body { get; set; }
    [Required]
    public bool IsPosted { get; set; }
    [Required]
    public DateTime CreationTime { get; set; }
    [Required]
    public int UserId { get; set; }
    public virtual User? User { get; set; }
}
