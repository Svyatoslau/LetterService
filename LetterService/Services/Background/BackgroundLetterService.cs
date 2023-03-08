using LetterService.DAL.Entities;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.EntityFrameworkCore;
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
    private readonly DbContextOptions<LetterServiceDbContext> _options;
    public BackgroundLetterService(IConfiguration config)
    {
        _config = config;

        var smtpConfig = _config.GetSection("Smtp");

        _host = smtpConfig["host"];
        _port = smtpConfig["port"];
        _hostUser = smtpConfig["auth:user"];
        _hostPassword = smtpConfig["auth:pass"];

        string? connection = config.GetConnectionString("DefaultConnection");

        _options = new DbContextOptionsBuilder<LetterServiceDbContext>()
            .UseSqlServer(connection).Options;
    }

    public async Task SendLettersAsync()
    {
        using (LetterServiceDbContext context = new LetterServiceDbContext(_options))
        {
            Console.WriteLine(DateTime.UtcNow);
            await context.Letters
            .Where(l => !l.IsPosted && l.PostTime < DateTime.Now)
            .Join(
                context.Users,
                l => l.UserId,
                u => u.Id,
                (letter, user) => new
                {
                    Email = user.Email,
                    letter = letter
                }
            )
            .ForEachAsync(letterObject =>
            {
                
                try
                {
                    var email = new MimeMessage();
                    email.From.Add(MailboxAddress.Parse(_hostUser));
                    email.To.Add(MailboxAddress.Parse(letterObject.Email));
                    email.Subject = letterObject.letter.Topic;
                    email.Body = new TextPart(TextFormat.Html)
                    {
                        Text = $"<h3>{letterObject.letter.Body}</h3>" +
                               $"<h5>Post time: {letterObject.letter.PostTime + (DateTime.Now - DateTime.UtcNow)}<h5>"
                    };

                    using var smtp = new SmtpClient();
                    smtp.Connect(_host, int.Parse(_port), SecureSocketOptions.SslOnConnect);
                    smtp.Authenticate(_hostUser, _hostPassword);
                    smtp.Send(email);
                    smtp.Disconnect(true);
                    letterObject.letter.IsPosted = true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    letterObject.letter.IsPosted = false;
                }
            });

            await context.SaveChangesAsync();
        }
         
    }

    public async Task RemovePostedLetttersAsync()
    {
        using (LetterServiceDbContext context = new LetterServiceDbContext(_options))
        {
            await context.Letters
            .Where(letter => letter.IsPosted)
            .ExecuteDeleteAsync();
        }
            
    }


}
