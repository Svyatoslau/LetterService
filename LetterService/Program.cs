using LetterService.DAL.Entities;
using LetterService.Mappers;
using LetterService.Services.Security;
using LetterService.Services.Security.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;
string connection = config.GetConnectionString("DefaultConnection");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthorization();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = config["Jwt:Issuer"],
            ValidateAudience = false,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config["Jwt:Key"])
            ),
            ValidateIssuerSigningKey = true,
         };
    });

builder.Services
    .AddDbContext<LetterServiceDbContext>(option => option.UseSqlServer(connection))
    .AddSingleton<IHasher, SecretHasher>()
    .AddSingleton<ILogin, SecuróEntryService>()
    .AddSingleton<ICreateToken, CreateTokenService>()
    .AddSingleton<IRegister, RegistrationService>()
    .AddAutoMapper(typeof(LetterServiceProfile));
    
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
