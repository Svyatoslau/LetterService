namespace LetterService.DAL.Entities;

public class Letter
{
    public int Id { get; set; }
    public DateTime PostTime { get; set; }
    public string Message { get; set; } = null!;
    public bool IsPosted { get; set; }
    public DateTime CreationTime { get; set; }
    public int UserId { get; set; }    
    public virtual User User { get; set; } = null!;
}
