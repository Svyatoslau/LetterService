namespace LetterService.Models.API;

public class LetterForCreate
{
    public DateTime PostTime { get; set; }
    public string Message { get; set; } = null!;
    public DateTime CreationTime { get; set; }
}
