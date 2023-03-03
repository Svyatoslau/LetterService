using LetterService.DAL.Entities;
using System.Reflection;

namespace LetterService.Services.Background;

public class LetterPeriodSendService : BackgroundService
{
    // delay one minute for letters sending
    private const int DELAY_FOR_PERIOD_SENDING = 60 * 1000;
    // every 30 days clean posted message
    private const int DELETE_POSTED_MESSAGE_PERIODS = 60 * 24 * 30;

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

            if (i >= DELETE_POSTED_MESSAGE_PERIODS)
            {
                _logger.LogInformation("Try delete posted Letters");

                await _letterSerivce.RemovePostedLetttersAsync();
                i = 0;
            }

            await Task.Delay(DELAY_FOR_PERIOD_SENDING);
        }
    }
}
