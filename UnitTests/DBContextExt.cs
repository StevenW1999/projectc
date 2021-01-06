using Project;
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
                Password = "test",
                Email = "test@test.nl",
                PostalCode = "1234AA",
                ProfilePicture = null,
                Active = true
            });

            dbContext.Users.Add(new User
            {
                Id = 2,
                Username = "test2",
                Password = "test",
                Email = "test2@test.nl",
                PostalCode = "1234AA",
                ProfilePicture = null,
                Active = true
            });

            dbContext.Users.Add(new User
            {
                Id = 3,
                Username = "test3",
                Password = "test",
                Email = "tes3t@test.nl",
                PostalCode = "1234AA",
                ProfilePicture = null,
                Active = true
            });
        }
    }
}
