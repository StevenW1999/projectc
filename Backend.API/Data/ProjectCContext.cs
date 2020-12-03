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

    }
}
