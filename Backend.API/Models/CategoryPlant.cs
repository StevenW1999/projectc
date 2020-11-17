using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace ProjectC.Models
{
    [Table("Category_Plant", Schema = "Project C")]
    public partial class CategoryPlant
    {
        [Key]
        [Column("CategoryPlant_id")]
        public int CategoryPlantId { get; set; }
        [Column("Plant_id")]
        public int PlantId { get; set; }
        [Column("Category_id")]
        public int CategoryId { get; set; }

        [ForeignKey(nameof(CategoryId))]
        [InverseProperty("CategoryPlants")]
        public virtual Category Category { get; set; }
        [ForeignKey(nameof(PlantId))]
        [InverseProperty("CategoryPlants")]
        public virtual Plant Plant { get; set; }
    }
}
