using System;
using System.Collections.Generic;

#nullable disable

namespace ProjectC
{
    public partial class User
    {
        public User()
        {
            Plants = new HashSet<Plant>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string PostalCode { get; set; }
        public byte[] ProfilePicture { get; set; }
        public bool Active { get; set; }

        public virtual ICollection<Plant> Plants { get; set; }
    }
}
