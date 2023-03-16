using LetterService.DAL.Entities;
using LetterService.Services.Security.Interfaces;

namespace LetterService.Services.Security;

public class SecurуEntryService : ILogin
{
    private readonly IHasher _hasher;
    private readonly ICreateToken _tokenService;
    public SecurуEntryService(IHasher hasher, ICreateToken tokenService) =>
        (_hasher, _tokenService) = (hasher, tokenService);

    public string Login(User user, string password)
    {
        bool isVerifyed = _hasher.Verify(password, user.Password);
        if (!isVerifyed)
            return null;

        return _tokenService.CreateToken(user);
    }
}
