using Microsoft.EntityFrameworkCore;

namespace LetterService.DAL.Entities;

public partial class LetterServiceDbContext : DbContext
{
    public virtual DbSet<Letter> Letters { get; set; }
    public virtual DbSet<User> Users { get; set; }

    public LetterServiceDbContext(DbContextOptions<LetterServiceDbContext> options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasMany(u => u.Letters).WithMany(l => l.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserLetter",
                    r => r.HasOne<Letter>().WithMany()
                        .HasForeignKey("LetterId"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId"),
                    j =>
                    {
                        j.HasKey("UserId", "LetterId").IsClustered(false);
                        j.ToTable("UserLetter");
                    });
        });
        modelBuilder.Entity<Letter>(entity =>
            entity.Property(l => l.PostTime).HasColumnType("datetie"));

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
