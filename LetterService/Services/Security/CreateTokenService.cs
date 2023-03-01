using LetterService.DAL.Entities;
using LetterService.Models;
using LetterService.Services.Security.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LetterService.Services.Security;

public class CreateTokenService : ICreateToken
{
    private readonly IConfiguration _config;

    public CreateTokenService(IConfiguration config) =>
        _config = config;

    public string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email),
            new Claim(ClaimsIdentity.DefaultRoleClaimType, GetRole(user.Role))
        };

        SigningCredentials signingCredentials =
            new SigningCredentials(GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256);

        var jwt = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: user.Email,
            claims: claims,
            expires: DateTime.UtcNow.Add(TimeSpan.FromMinutes(5)),
            signingCredentials: signingCredentials
        );

        return new JwtSecurityTokenHandler().WriteToken(jwt);
    }

    private SymmetricSecurityKey GetSymmetricSecurityKey()
    {
        string key = _config["Jwt:Key"];

        if (key.IsNullOrEmpty())
            throw new ApplicationException("Empty configuration for Jwt:Key");

        return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
    }

    private string GetRole(Role role) => role switch
    {
        Role.User => "user",
        Role.Admin => "admin",
        _ => throw new Exception("no such role")
    };
}
