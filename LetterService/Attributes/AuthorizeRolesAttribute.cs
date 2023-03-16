using LetterService.Models;
using Microsoft.AspNetCore.Authorization;

namespace LetterService.Attributes;

public class AuthorizeRolesAttribute : AuthorizeAttribute
{
    public AuthorizeRolesAttribute(params Role[] roles) : base()
    {
        Roles = string.Join(",", roles);
    }
}