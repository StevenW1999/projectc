using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace ProjectC.Models
{
    [Table("Plant", Schema = "Project C")]
    public partial class Plant
    {
        public Plant()
        {
            CategoryPlants = new HashSet<CategoryPlant>();
        }

        [Key]
        [Column("Plant_id")]
        public int PlantId { get; set; }
        [Column("User_id")]
        public int? UserId { get; set; }
        [Column("Category_id")]
        public int? CategoryId { get; set; }
        public byte[] Image { get; set; }
        [Required]
        [StringLength(255)]
        public string Name { get; set; }
        [StringLength(255)]
        public string Description { get; set; }
        public bool Available { get; set; }

        [ForeignKey(nameof(CategoryId))]
        [InverseProperty("Plants")]
        public virtual Category Category { get; set; }
        [ForeignKey(nameof(UserId))]
        [InverseProperty("Plants")]
        public virtual User User { get; set; }
        [InverseProperty(nameof(CategoryPlant.Plant))]
        public virtual ICollection<CategoryPlant> CategoryPlants { get; set; }
    }
}
