using Project;
using Project.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace XUnitTestProject1
{
    public static class DBContextExt
    {
        public static void Seed(this ProjectCContext dbContext)
        {
            dbContext.Users.Add(new User
            {
                Id = 1,
                Username = "test1",
                Password = "123456789",
                Email = "test@test.nl",
                PostalCode = "1234AA",
                ProfilePicture = null,
                Active = true
            });

            dbContext.Users.Add(new User
            {
                Id = 2,
                Username = "test2",
                Password = "123456789",
                Email = "test2@test.nl",
                PostalCode = "1234AA",
                ProfilePicture = null,
                Active = true
            });

            dbContext.Users.Add(new User
            {
                Id = 3,
                Username = "test3",
                Password = "123456789",
                Email = "tes3t@test.nl",
                PostalCode = "1234AA",
                ProfilePicture = null,
                Active = true
            });
            dbContext.Admins.Add(new Admin
            {
                Id = 1,
                Username = "Admin1",
                Password = "password"
            });

            dbContext.FriendRequests.Add(new FriendRequest
            {
                Id = 2,
                IsConfirmed = true,
                Friend1Id = 1,
                Friend2Id = 2
            });

            dbContext.FriendRequests.Add(new FriendRequest
            {
                Id = 3,
                IsConfirmed = false,
                Friend1Id = 1,
                Friend2Id = 3
            });
            dbContext.SaveChanges();
        }
    }
}
