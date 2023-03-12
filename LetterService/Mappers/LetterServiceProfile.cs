using AutoMapper;
using LetterService.DAL.Entities;
using LetterService.Models;
using LetterService.Models.API;
using LetterService.Models.DTO;

namespace LetterService.Mappers;

public class LetterServiceProfile : Profile
{
    public LetterServiceProfile()
    {
        CreateMap<Letter, LetterDto>();
        CreateMap<User, UserDto>();
        CreateMap<UserForCreation, User>();
        CreateMap<UserLoginModel, UserForCreation>()
            .ForMember(dest => dest.Role, opt => opt.MapFrom(src => Role.User));
    }
}
