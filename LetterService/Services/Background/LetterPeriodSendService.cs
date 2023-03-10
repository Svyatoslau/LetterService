using LetterService.DAL.Entities;
using System.Reflection;
namespace LetterService.Services.Background;

public class LetterPeriodSendService : BackgroundService
{
    private readonly IConfiguration _config;
    // delay one minute for letters sending
    private readonly int _delayForPeriodSending;
    // every 30 days clean posted message
    private readonly int _deletePostedMessagePeriods;

    private readonly IBackgroundLetter _letterSerivce;
    private readonly ILogger<LetterPeriodSendService> _logger;

    public LetterPeriodSendService(IBackgroundLetter letterSerivce, ILogger<LetterPeriodSendService> logger, IConfiguration config)
    {
        (_letterSerivce, _logger, _config) = (letterSerivce, logger, config);

        _delayForPeriodSending = int.Parse(_config["Constant:DELAY_FOR_PERIOD_SENDING"]);
        _deletePostedMessagePeriods = int.Parse(_config["Constant:DELAY_FOR_PERIOD_SENDING"]);
    }


    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        int i = 0;
        while (!stoppingToken.IsCancellationRequested)
        {

            try
            {
                _logger.LogInformation("Try Send not Posted letters");
                await _letterSerivce.SendLettersAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError($"letter background error: {ex.Message}");
            }

            i++;

            if (i >= _deletePostedMessagePeriods)
            {
                _logger.LogInformation("Try delete posted Letters");

                await _letterSerivce.RemovePostedLetttersAsync();
                i = 0;
            }

            await Task.Delay(_delayForPeriodSending);
        }
    }
}
