using AutoMapper;
using LetterService.DAL.Entities;
using LetterService.Models.DTO;

namespace LetterService.Mappers;

public class LetterServiceProfile : Profile
{
    public LetterServiceProfile()
    {
        CreateMap<Letter, LetterDto>();
        CreateMap<User, UserDto>();
    }
}
