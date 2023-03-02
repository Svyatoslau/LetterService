using LetterService.DAL.Entities;
using LetterService.Models;
using LetterService.Models.API;

namespace LetterService.Services.Security.Interfaces;

public interface IRegister
{
    public User CreateUser(UserApiModel user, Role role);
}
