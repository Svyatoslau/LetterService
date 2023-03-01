using LetterService.DAL.Entities;
using LetterService.Models;
using LetterService.Models.DTO;

namespace LetterService.Services.Security.Interfaces;

public interface IRegister
{
    public User CreateUser(UserDto user, Role role);
}
