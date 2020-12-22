using System;
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Project.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

#nullable disable

namespace Project
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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Plant>()
                .HasOne(s => s.User)
                .WithMany(g => g.Plants)
                .HasForeignKey(s => s.UserId);

            modelBuilder.Entity<User>()
                .HasMany(s => s.Plants)
                .WithOne(e => e.User)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<FriendRequest>()
                .HasKey(f => new { f.Friend1Id, f.Friend2Id });

            modelBuilder.Entity<FriendRequest>()
                .HasOne(e => e.Friend1)
                .WithMany(e => e.MyFriends)
                .HasForeignKey(e => e.Friend1Id);

            modelBuilder.Entity<FriendRequest>()
                .HasOne(e => e.Friend2)
                .WithMany(e => e.FriendsOf)
                .HasForeignKey(e => e.Friend2Id);
        }

        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<Plant> Plants { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<FriendRequest> FriendRequests { get; set; }

    }
}
