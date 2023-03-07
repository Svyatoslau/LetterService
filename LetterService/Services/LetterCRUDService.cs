using LetterService.DAL.Entities;
using LetterService.Models.API;
using LetterService.Models.DTO;
using LetterService.Services.Interfaces;

namespace LetterService.Services;

public class LetterCRUDService : ICRUDLetter
{
    public Letter Create(LetterForCreate model, int userId)
    {
        return new Letter
        {
            CreationTime = DateTime.UtcNow,
            PostTime = model.PostTime < DateTime.UtcNow
                       ? DateTime.UtcNow
                       : model.PostTime,
            Body = model.Body,
            Topic= model.Topic,
            IsPosted = false,
            UserId = userId
        };
    }

    public void Update(Letter letter, LetterForCreate letterForCreateDto)
    {
        letter.PostTime = letterForCreateDto.PostTime < DateTime.UtcNow
                       ? DateTime.UtcNow
                       : letterForCreateDto.PostTime;
        letter.Body = letterForCreateDto.Body;
        letter.Topic = letterForCreateDto.Topic;
        letter.CreationTime = DateTime.UtcNow;
        letter.IsPosted = false;
    }


}