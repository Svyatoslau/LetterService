namespace LetterService.Models.API;

public record BadLogin()
{
    public string Message { get; set; } = "Not valid credentials";
    public string User { get; set; }
}
