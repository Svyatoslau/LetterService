namespace LetterService.Services.Security.Interfaces;

public interface IHasher
{
    public string Hash(string input);
    public bool Verify(string input, string hashString);
}
