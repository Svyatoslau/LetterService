using LetterService.DAL.Entities;
using LetterService.Models.API;
using LetterService.Models.DTO;

namespace LetterService.Services.Interfaces;

public interface ICRUDLetter
{
    public Letter Create(LetterForCreate model, int userId);
    public void Update(Letter letter, LetterForCreate letterForCreateDto);
}
