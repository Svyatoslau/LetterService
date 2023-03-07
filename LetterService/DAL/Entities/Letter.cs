namespace LetterService.DAL.Entities;

public class Letter
{
    public int Id { get; set; }
    public DateTime PostTime { get; set; }
    public string? Topic { get; set; }
    public string? Body { get; set; }
    public bool IsPosted { get; set; }
    public DateTime CreationTime { get; set; }
    public int UserId { get; set; }    
    public virtual User User { get; set; } = null!;
}
