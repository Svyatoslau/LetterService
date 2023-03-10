namespace LetterService.Models.API;

public class LetterForCreate
{
    public DateTime PostTime { get; set; }
    public string? Topic { get; set; }
    public string? Body { get; set; }
}