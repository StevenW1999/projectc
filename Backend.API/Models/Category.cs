using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace ProjectC.Models
{
    [Table("Category", Schema = "Project C")]
    public partial class Category
    {
        public Category()
        {
            CategoryPlants = new HashSet<CategoryPlant>();
            Plants = new HashSet<Plant>();
        }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [Key]
        [Column("Category_id")]
        public int CategoryId { get; set; }

        [InverseProperty(nameof(CategoryPlant.Category))]
        public virtual ICollection<CategoryPlant> CategoryPlants { get; set; }
        [InverseProperty(nameof(Plant.Category))]
        public virtual ICollection<Plant> Plants { get; set; }
    }
}
