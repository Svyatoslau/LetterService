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
            CreationTime = model.CreationTime,
            PostTime = model.PostTime,
            Message = model.Message,
            IsPosted = false,
            UserId = userId
        };
    }

    public void Update(Letter letter, LetterDto letterDto)
    {
        letter.PostTime = letterDto.PostTime;
        letter.Message= letterDto.Message;
        letter.CreationTime = DateTime.Now;
    }


}