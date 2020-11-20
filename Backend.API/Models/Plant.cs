using System;
using System.Collections.Generic;

#nullable disable

namespace ProjectC
{
    public partial class Plant
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public byte[] Image { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Available { get; set; }
        public DateTime? Timestamp { get; set; }
        public string PlantSize { get; set; }
        public string Shadow { get; set; }
        public string InsideOrOutside { get; set; }
        public string Type { get; set; }
        public string YoungOrOld { get; set; }
        public string Season { get; set; }
        public bool? Edible { get; set; }
        public string AmountOfWater { get; set; }
        public string Color { get; set; }

        public virtual User User { get; set; }
    }
}
