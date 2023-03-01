using Microsoft.EntityFrameworkCore;

namespace LetterService.DAL.Entities;

public partial class LetterServiceDbContext : DbContext
{
    public virtual DbSet<Letter> Letters { get; set; }
    public virtual DbSet<User> Users { get; set; }

    public LetterServiceDbContext(DbContextOptions<LetterServiceDbContext> options)
        : base(options) { }

}
