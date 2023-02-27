namespace LetterService.DAL.Entities;

public class Letter
{
    public int Id { get; set; }
    public DateTime PostTime { get; set; }
    public string Message { get; set; }
    public virtual ICollection<User> Users { get; } = new List<User>();
}
