using Microsoft.EntityFrameworkCore;
using TutorialsWebApi.Domain.Entity;

namespace TutorialsWebApi.Domain.Contexts
{
    public class TutorialContext : DbContext
    {
        DbSet<Tutorial> Tutorials { get; set; }
        DbSet<Subject> Subjects { get; set; }
        protected TutorialContext()
        {
        }
        public TutorialContext(DbContextOptions<TutorialContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Tutorial>()
                                            .HasMany(x => x.Subjects)
                                            .WithOne(q => q.Tutorial)
                                            .HasForeignKey(a => a.tutorialId);

            modelBuilder.Entity<Subject>()
                                            .HasOne(x => x.Tutorial)
                                            .WithMany(q => q.Subjects)
                                            .HasForeignKey(a => a.tutorialId);
        }

    }
}
