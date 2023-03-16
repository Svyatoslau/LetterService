using AutoMapper;
using LetterService.DAL.Entities;
using LetterService.Models;
using LetterService.Models.API;
using LetterService.Services.Security.Interfaces;

namespace LetterService.Services.Security;

public class RegistrationService : IRegister
{
    private IHasher _hasher;
    private IMapper _mapper;
    public RegistrationService(IHasher hasher, IMapper mapper) =>
        (_hasher, _mapper) = (hasher, mapper);

    public User CreateUser(UserForCreation user)
    {
        string hashedPassword = _hasher.Hash(user.Password);

        user.Password = hashedPassword;

        return _mapper.Map<User>(user);
    }
}
