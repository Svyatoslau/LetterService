using LetterService.Models;
using System.ComponentModel.DataAnnotations;

namespace LetterService.DAL.Entities;

public class User
{
    public int Id { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required Role Role { get; set; }
    public virtual ICollection<Letter> Letters { get; } = new List<Letter>();
}