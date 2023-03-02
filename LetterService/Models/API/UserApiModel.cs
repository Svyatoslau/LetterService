using System.ComponentModel.DataAnnotations;

namespace LetterService.Models.API;

public class UserApiModel
{
    [EmailAddress]
    public required string Email { get; set; }
    public required string Password { get; set; }
}
