using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace ProjectC
{
    public partial class Plant
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public byte[] Image { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Available { get; set; }
        public string Type { get; set; }
        public bool Perennial { get; set; }
        public string Shadow { get; set; }
        public string AmountOfWater { get; set; }
        public string Soil { get; set; }
        public int GrowthHeigth { get; set; }
        public string Color { get; set; }
        public DateTime SeasonFrom { get; set; }
        public DateTime SeasonTo { get; set; }
        public string SpecialFeatures { get; set; }
        public DateTime Timestamp { get; set; }
        public virtual User User { get; set; }
    }
}
