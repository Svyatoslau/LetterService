using AutoMapper;
using AutoMapper;
using LetterService.Attributes;
using LetterService.DAL.Entities;
using LetterService.Models;
using LetterService.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace LetterService.Controllers;
[Route("api")]
[ApiController]
[AuthorizeRoles(Role.Admin)]
public class AdminController : ControllerBase
{
    private readonly LetterServiceDbContext _context;
    private readonly IMapper _mapper;

    public AdminController(LetterServiceDbContext context, IMapper mapper) =>
        (_context, _mapper) = (context, mapper);
}
