using System.ComponentModel.DataAnnotations;

namespace LetterService.Models.API;

public class UserForCreation
{
    [EmailAddress]
    public required string Email { get; set; }
    [MinLength(8)]
    public required string Password { get; set; }
    public required Role Role { get; set; }
}
