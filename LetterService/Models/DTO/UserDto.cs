using System.ComponentModel.DataAnnotations;

namespace LetterService.Models.DTO;

public class UserDto
{
    [EmailAddress]
    public required string Email { get; set; }
    public required string Password { get; set; }
}
