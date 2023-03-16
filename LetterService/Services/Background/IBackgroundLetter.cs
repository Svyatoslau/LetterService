namespace LetterService.Services.Background;

public interface IBackgroundLetter
{
    public Task SendLettersAsync();
    public Task RemovePostedLetttersAsync();
}
