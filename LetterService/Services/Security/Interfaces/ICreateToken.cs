using LetterService.DAL.Entities;

namespace LetterService.Services.Security.Interfaces;

public interface ICreateToken
{
    public string CreateToken(User user);
}
