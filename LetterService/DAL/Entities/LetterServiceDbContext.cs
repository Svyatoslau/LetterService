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
        modelBuilder.Entity<Letter>(entity =>
        {
            entity.Property(e => e.Message).HasMaxLength(1000);
            entity.Property(e => e.PostTime).HasColumnType("datetime");
            entity.HasOne(d => d.User).WithMany(p => p.Letters)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");
            entity.Property(e => e.Email).HasMaxLength(30);
            entity.Property(e => e.Password)
                .HasMaxLength(111)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Role)
                .HasMaxLength(10)
                .IsUnicode(false);
        });
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
