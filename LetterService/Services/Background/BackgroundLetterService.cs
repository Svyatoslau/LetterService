using LetterService.DAL.Entities;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using MimeKit.Text;
using System.Runtime.CompilerServices;
namespace LetterService.Services.Background;
public class BackgroundLetterService : IBackgroundLetter
{
    private readonly IConfiguration _config;
    private readonly string? _host;
    private readonly string? _port;
    private readonly string? _hostUser;
    private readonly string? _hostPassword;
    private readonly IServiceProvider _serviceProvider;
    private readonly ILogger<BackgroundLetterService> _logger;
    public BackgroundLetterService(
        IConfiguration config,
        IServiceProvider serviceProvider,
        ILogger<BackgroundLetterService> logger
    )
    {
        (_config, _serviceProvider, _logger) = 
            (config, serviceProvider, logger);

        var smtpConfig = _config.GetSection("Smtp");
        _host = smtpConfig["host"];
        _port = smtpConfig["port"];
        _hostUser = smtpConfig["auth:user"];
        _hostPassword = smtpConfig["auth:pass"];
    }
    public async Task SendLettersAsync()
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var context = scope.ServiceProvider.GetService<LetterServiceDbContext>();

            _logger.LogInformation($"Current UTC Time on server: {DateTime.UtcNow}");

            await context.Letters
                .Where(l => !l.IsPosted && l.PostTime < DateTime.UtcNow)
                .Include(l => l.User)
                .ForEachAsync(letter =>
                {
                    try
                    {
                        var stringEmails = letter.Emails.Split(';').ToList();

                        var email = new MimeMessage();
                        email.From.Add(MailboxAddress.Parse(_hostUser));

                        if (!stringEmails.IsNullOrEmpty())
                        {
                            var emails = stringEmails
                                .Select(email => MailboxAddress.Parse(_hostUser));

                            email.To.AddRange(emails);
                        }
                        else
                        {
                            email.To.Add(MailboxAddress.Parse(letter.User?.Email));
                        }
                        

                        email.Subject = letter.Topic;
                        email.Body = new TextPart(TextFormat.Html)
                        {
                            Text = $"<h3>{letter.Body}</h3>" +
                                   $"<h5>Post time: {letter.PostTime + (DateTime.Now - DateTime.UtcNow)}<h5>"
                        };

                        using var smtp = new SmtpClient();
                        smtp.Connect(_host, int.Parse(_port), SecureSocketOptions.SslOnConnect);
                        smtp.Authenticate(_hostUser, _hostPassword);
                        smtp.Send(email);
                        smtp.Disconnect(true);
                        letter.IsPosted = true;
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex.Message);
                        letter.IsPosted = false;
                    }
                });

            await context.SaveChangesAsync();
        }

    }
    public async Task RemovePostedLetttersAsync()
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var context = scope.ServiceProvider.GetService<LetterServiceDbContext>();

            await context.Letters
                .Where(letter => letter.IsPosted)
                .ExecuteDeleteAsync();
        }

    }
}