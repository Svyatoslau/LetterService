namespace LetterService.Models.API;

public class LetterForCreate
{
    public DateTime PostTime { get; set; }
    public required string Topic { get; set; }
    public required string Body { get; set; }
}
