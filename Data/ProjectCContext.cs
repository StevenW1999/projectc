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

            modelBuilder.Entity<FriendList>(b => {
                b.HasKey(x => new { x.FriendFromId, x.FriendToId });

                b.HasOne(x => x.FriendFrom)
                    .WithMany(x => x.Friends)
                    .HasForeignKey(x => x.FriendFromId)
                    .OnDelete(DeleteBehavior.Restrict);

                b.HasOne(x => x.FriendTo)
                    .WithMany(x => x.FriendsOf)
                    .HasForeignKey(x => x.FriendToId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
        }

        public virtual DbSet<Admin> Admins { get; set; }
        public virtual DbSet<Plant> Plants { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<FriendList> FriendLists { get; set; }

    }
}
