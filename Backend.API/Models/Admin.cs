using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace ProjectC.Models
{
    [Table("Admin", Schema = "Project C")]
    public partial class Admin
    {
        [Key]
        [Column("Admin_id")]
        public int AdminId { get; set; }
        [Required]
        [StringLength(50)]
        public string Username { get; set; }
        [Required]
        [StringLength(30)]
        public string Password { get; set; }
    }
}
