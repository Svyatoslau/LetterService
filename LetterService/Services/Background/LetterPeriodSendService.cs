using LetterService.DAL.Entities;
using System.Reflection;

namespace LetterService.Services.Background;

public class LetterPeriodSendService : BackgroundService
{
    private const int DELAY = 60000;
    private const int DELETE_POSTED_MESSAGE_PERIOD = 1440;

    private readonly IBackgroundLetter _letterSerivce;
    private readonly ILogger<LetterPeriodSendService> _logger;

    public LetterPeriodSendService(IBackgroundLetter letterSerivce, ILogger<LetterPeriodSendService> logger) =>
        (_letterSerivce, _logger) = (letterSerivce, logger);

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        int i = 0;
        while(!stoppingToken.IsCancellationRequested)
        {
            
            try
            {
                _logger.LogInformation("Try Send not Posted letters");

                await _letterSerivce.SendLettersAsync();
            }
            catch(Exception ex)
            {
                _logger.LogError($"letter background error: {ex.Message}");
            }

            i++;

            if (i >= DELETE_POSTED_MESSAGE_PERIOD)
            {
                _logger.LogInformation("Try delete posted Letters");

                await _letterSerivce.RemovePostedLetttersAsync();
                i = 0;
            }

            await Task.Delay(DELAY);
        }
    }
}
