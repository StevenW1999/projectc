using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;


#nullable disable

namespace ProjectC.Data
{
    public partial class ProjectCContext : DbContext
    {
        public ProjectCContext()
        {
        }

        public ProjectCContext(DbContextOptions<ProjectCContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<CategoryPlant> CategoryPlants { get; set; }
        public virtual DbSet<Plant> Plants { get; set; }
        public virtual DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.Property(e => e.AdminId).ValueGeneratedNever();
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.CategoryId).ValueGeneratedNever();
            });

            modelBuilder.Entity<CategoryPlant>(entity =>
            {
                entity.Property(e => e.CategoryPlantId).ValueGeneratedNever();

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.CategoryPlants)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Category_id_fkey");

                entity.HasOne(d => d.Plant)
                    .WithMany(p => p.CategoryPlants)
                    .HasForeignKey(d => d.PlantId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Plant_id_fkey");
            });

            modelBuilder.Entity<Plant>(entity =>
            {
                entity.Property(e => e.PlantId).ValueGeneratedNever();

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Plants)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("Category_id_fkey");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Plants)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("User_id_fkey");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId).ValueGeneratedNever();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
