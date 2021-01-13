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

            dbContext.Plants.Add(new Plant
            {
                Id = 1,
                UserId = 1,
                Image = null,
                Name = "Test Plant1",
                Description = "some description",
                Available = true,
                Category = "some category A",
                Type = "some Type A",
                Perennial = "some Perennial",
                Shadow = "Dark",
                AmountOfWater = "a lot", 
                Soil = "some soil",
                GrowthHeigth = "very tall",
                Color = "red",
                SeasonFrom = DateTime.Now,
                SeasonTo = DateTime.Now,
                SpecialFeatures = "some special features",
                Timestamp = DateTime.Now
            });

            dbContext.Plants.Add(new Plant
            {
                Id = 2,
                UserId = 1,
                Image = null,
                Name = "Test Plant2",
                Description = "some description",
                Available = true,
                Category = "some category A",
                Type = "some Type A",
                Perennial = "some Perennial",
                Shadow = "Dark",
                AmountOfWater = "a lot",
                Soil = "some soil",
                GrowthHeigth = "very tall",
                Color = "red",
                SeasonFrom = DateTime.Now,
                SeasonTo = DateTime.Now,
                SpecialFeatures = "some special features",
                Timestamp = DateTime.Now
            });

            dbContext.Plants.Add(new Plant
            {
                Id = 3,
                UserId = 2,
                Image = null,
                Name = "another",
                Description = "another",
                Available = false,
                Category = "some category B",
                Type = "some Type B",
                Perennial = "another Perennial",
                Shadow = "Light",
                AmountOfWater = "not much",
                Soil = "another soil",
                GrowthHeigth = "small",
                Color = "blue",
                SeasonFrom = DateTime.Now,
                SeasonTo = DateTime.Now,
                SpecialFeatures = "another feature",
                Timestamp = DateTime.Now
            });
            dbContext.SaveChanges();
        }
    }
}
