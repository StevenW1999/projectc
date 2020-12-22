using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Models
{
    public class FriendRequest
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public bool IsConfirmed { get; set; }
        public virtual User Friend1 { get; set; }
        public int Friend1Id { get; set; }
        public virtual User Friend2 { get; set; }
        public int Friend2Id { get; set; }
    }
}
