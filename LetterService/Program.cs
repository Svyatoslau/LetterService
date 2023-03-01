using LetterService.DAL.Entities;
using LetterService.Services.Security;
using LetterService.Services.Security.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

string connection = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services
    .AddDbContext<LetterServiceDbContext>(option => option.UseSqlServer(connection))
    .AddSingleton<IHasher, SecretHasher>()
    .AddSingleton<ILogin, Secur�EntryService>()
    .AddSingleton<ICreateToken, CreateTokenService>();
    
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
