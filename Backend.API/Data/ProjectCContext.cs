using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ProjectC
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
        public virtual DbSet<Plant> Plants { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admin>(entity =>
            {
                entity.ToTable("Admin", "Project C");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Plant>(entity =>
            {
                entity.ToTable("Plant", "Project C");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.AmountOfWater)
                    .HasMaxLength(10)
                    .HasDefaultValueSql("'Unknown'::character varying");

                entity.Property(e => e.Color)
                    .HasMaxLength(10)
                    .HasDefaultValueSql("'Unknown'::character varying");

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.InsideOrOutside)
                    .HasMaxLength(10)
                    .HasDefaultValueSql("'Unknown'::character varying");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.PlantSize)
                    .HasMaxLength(10)
                    .HasDefaultValueSql("'Unknown'::character varying");

                entity.Property(e => e.Season)
                    .HasMaxLength(10)
                    .HasDefaultValueSql("'Unknown'::character varying");

                entity.Property(e => e.Shadow)
                    .HasMaxLength(10)
                    .HasDefaultValueSql("'Unknown'::character varying");

                entity.Property(e => e.Timestamp).HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Type)
                    .HasMaxLength(10)
                    .HasDefaultValueSql("'Unknown'::character varying");

                entity.Property(e => e.UserId).HasColumnName("User_id");

                entity.Property(e => e.YoungOrOld)
                    .HasMaxLength(10)
                    .HasDefaultValueSql("'Unknown'::character varying");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Plants)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("User_id_fkey");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User", "Project C");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");

                entity.Property(e => e.Email).HasColumnType("character varying"); 
                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.PostalCode)
                    .HasColumnType("character varying")
                    .HasColumnName("Postal_code");

                entity.Property(e => e.ProfilePicture).HasColumnName("Profile_picture");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
