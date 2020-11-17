using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace ProjectC.Models
{
    [Table("User", Schema = "Project C")]
    public partial class User
    {
        public User()
        {
            Plants = new HashSet<Plant>();
        }

        [Key]
        [Column("User_id")]
        public int UserId { get; set; }
        [Required]
        [StringLength(50)]
        public string Username { get; set; }
        [Required]
        [StringLength(30)]
        public string Password { get; set; }
        [Column(TypeName = "character varying")]
        public string Email { get; set; }
        [Column("Postal_code", TypeName = "character varying")]
        public string PostalCode { get; set; }
        [Column("Profile_picture")]
        public byte[] ProfilePicture { get; set; }
        public bool Active { get; set; }

        [InverseProperty(nameof(Plant.User))]
        public virtual ICollection<Plant> Plants { get; set; }
    }
}
