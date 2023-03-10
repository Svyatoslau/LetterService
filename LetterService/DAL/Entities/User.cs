using LetterService.Models;
using System.ComponentModel.DataAnnotations;

namespace LetterService.DAL.Entities;

public class User
{
    public int Id { get; set; }
    [Required]
    public string? Email { get; set; }
    [Required]
    public string? Password { get; set; }
    [Required]
    public Role Role { get; set; }
    public virtual ICollection<Letter> Letters { get; } = new List<Letter>();
}