using LetterService.DAL.Entities;

namespace LetterService.Services.Security.Interfaces;

public interface ILogin
{
    public string Login(User user, string password); 
}
