namespace LetterService.DAL.Entities;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string Role { get; set; } = null!;
    public virtual ICollection<Letter> Letters { get; } = new List<Letter>();
}
