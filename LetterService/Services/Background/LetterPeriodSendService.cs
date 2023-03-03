using LetterService.DAL.Entities;
using System.Reflection;

namespace LetterService.Services.Background;

public class LetterPeriodSendService : BackgroundService
{
    private const int DELAY = 60000;
    private const int DELETE_POSTED_MESSAGE_PERIOD = 1440;

    private readonly IBackgroundLetter _letterSerivce;

    public LetterPeriodSendService(IBackgroundLetter letterSerivce) =>
        _letterSerivce= letterSerivce;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        int i = 0;
        while(!stoppingToken.IsCancellationRequested)
        {
            
            try
            {
                Console.WriteLine("[INFO] Try Send not Posted letters");

                await _letterSerivce.SendLettersAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine($"[ERROR] letter background error: {ex.Message}");
            }

            i++;

            if (i >= DELETE_POSTED_MESSAGE_PERIOD)
            {
                Console.WriteLine("[INFO] Try delete posted Letters");
                await _letterSerivce.RemovePostedLetttersAsync();
                i = 0;
            }

            await Task.Delay(DELAY);
        }
    }
}
