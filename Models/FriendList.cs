using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Models
{
    public class FriendList
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public bool IsConfirmed { get; set; }
        public virtual User FriendFrom { get; set; }
        public int FriendFromId { get; set; }
        public virtual User FriendTo { get; set; }
        public int FriendToId { get; set; }
    }
}
