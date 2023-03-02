using LetterService.DAL.Entities;
using LetterService.Models;
using LetterService.Models.API;
using LetterService.Services.Security.Interfaces;

namespace LetterService.Services.Security;

public class RegistrationService : IRegister
{
    private IHasher _hasher;
    public RegistrationService(IHasher hasher) =>
        _hasher = hasher;

    public User CreateUser(UserApiModel user, Role role)
    {
        string hashedPassword = _hasher.Hash(user.Password);
        return new User
        {
            Email = user.Email,
            Password = hashedPassword,
            Role = role,
        };
    }
}
