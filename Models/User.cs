using Newtonsoft.Json;
using Project.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace Project
{
    public partial class User
    {
        public User()
        {
            Plants = new HashSet<Plant>();
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PostalCode { get; set; }
        public byte[] ProfilePicture { get; set; }
        public bool Active { get; set; }

        [JsonIgnore]
        public virtual ICollection<Plant> Plants { get; set; }
        [JsonIgnore]
        public virtual ICollection<FriendRequest> MyFriends { get; set; }
        [JsonIgnore]
        public virtual ICollection<FriendRequest> FriendsOf { get; set; }
    }
}
