using Microsoft.EntityFrameworkCore;
using Project.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using XUnitTestProject1;

namespace Project.UnitTests
{
    public class UnitTest2
    {
        [Fact]
        public async Task GetAllPlants ()
        {
            var _context = MockContext.GetContext(nameof(GetAllPlants));
            _context.Seed();
            var service = new PlantsService(_context);
            var response = service.GetPLants();
            var count = response.Result.Count();
            var count2 = _context.Plants.Count();

            Assert.Equal(count, count2);
        }

        [Fact]
        public async Task GetUserPlants()
        {
            int Id = 1;
            var _context = MockContext.GetContext(nameof(GetUserPlants));
            _context.Seed();
            var service = new PlantsService(_context);
            var response = service.GetUserPLants(Id);
            var count = response.Result.Count();
            var count2 = _context.Plants.Where(u => u.UserId == Id).ToList().Count();

            Assert.Equal(count, count2);
        }

        [Fact]
        public async Task GetNonUserPlants()
        {
            int Id = 10;
            var _context = MockContext.GetContext(nameof(GetAllPlants));
            var service = new PlantsService(_context);
            var response = service.GetUserPLants(Id);
            var count = response.Result.Count();
            var count2 = 0;

            Assert.Equal(count, count2);
        }

        [Fact]
        public async Task GetSpecificPlant()
        {
            int Id = 1;
            var _context = MockContext.GetContext(nameof(GetAllPlants));
            var service = new PlantsService(_context);
            var response = service.GetSpecificPLant(Id);
            var result = response.Result;
            var plant = _context.Plants.FirstOrDefault();

            Assert.Equal(plant, result);
        }

        [Theory]
        [InlineData(-1)]
        [InlineData(0)]
        [InlineData(10)]
        public async Task GetNonExistingSpecificPlant(int Id)
        {
            var _context = MockContext.GetContext(nameof(GetAllPlants));
            var service = new PlantsService(_context);
            var response = service.GetSpecificPLant(Id);
            var result = response.Result;

            Assert.Null(result);
        }

        [Fact]
        public async Task UpdatePlant()
        {
            var _context = MockContext.GetContext(nameof(UpdatePlant));
            _context.Seed();
            var service = new PlantsService(_context);
            var plant = _context.Plants.FirstOrDefault();
            var response = service.UpdatePlantAvailability(plant);

            Assert.False(response.Result.Available);
        }

        [Fact]
        public async Task AddValidPlant()
        {
            Plant plant = new Plant
            {
                Image = null,
                Name = "Test Plant4",
                Description = "some description",
                Available = false,
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
            };
            var _context = MockContext.GetContext(nameof(AddValidPlant));
            _context.Seed();
            var user = _context.Users.FirstOrDefault();
            var service = new PlantsService(_context);
            var response = service.AddPlant(plant, user);
            var result = response.Result;

            if (result.UserId == user.Id)
            {
                Assert.IsType<Plant>(result);
            }
        }

        [Fact]
        public async Task DeleteValidPlant()
        {
            var _context = MockContext.GetContext(nameof(DeleteValidPlant));
            _context.Seed();
            var user = _context.Users.FirstOrDefault();
            var plant = _context.Plants.FirstOrDefault(p => p.UserId == user.Id);
            var service = new PlantsService(_context);
            var response = service.DeletePlant(plant.Id, user);
            var result = response.Result;

            Assert.IsType<Plant>(result);
        }

        [Fact]
        public async Task DeleteInValidPlant()
        {
            var id = 10;
            var _context = MockContext.GetContext(nameof(DeleteInValidPlant));
            _context.Seed();
            var user = _context.Users.FirstOrDefault();
            var plant = _context.Plants.FirstOrDefault(p => p.UserId == user.Id);
            var service = new PlantsService(_context);
            var response = service.DeletePlant(id, user);
            var result = response.Result;

            Assert.Null(result);
        }

        [Fact]
        public async Task DeleteInValidUserPlant()
        {
            var id = 1;
            var _context = MockContext.GetContext(nameof(DeleteInValidUserPlant));
            _context.Seed();
            var user = _context.Users.FirstOrDefault(u => u.Id == 3);
            var plant = _context.Plants.FirstOrDefault(p => p.UserId == user.Id);
            var service = new PlantsService(_context);
            var response = service.DeletePlant(id, user);
            var result = response.Result;

            Assert.Null(result);
        }

        [Theory]
        [InlineData("", "", "", "", "", "", "", "", "")]
        [InlineData("some description", "", "", "", "", "", "", "", "")]
        [InlineData("some description", "date_asc", "", "", "", "", "", "", "")]
        [InlineData("some description", "date_asc", "some Type A", "", "", "", "", "", "")]
        [InlineData("some description", "date_asc", "some Type A", "some Perennial", "", "", "", "", "")]
        [InlineData("some description", "date_asc", "some Type A", "some Perennial", "a lot", "", "", "", "")]
        [InlineData("some description", "date_asc", "some Type A", "some Perennial", "a lot", "Dark", "", "", "")]
        [InlineData("some description", "date_asc", "some Type A", "some Perennial", "a lot", "Dark", "some soil", "", "")]
        [InlineData("some description", "date_asc", "some Type A", "some Perennial", "a lot", "Dark", "some soil", "very tall", "")]
        [InlineData("some description", "date_asc", "some Type A", "some Perennial", "a lot", "Dark", "some soil", "very tall", "red")]
        [InlineData("some description", "date_desc", "some Type A", "some Perennial", "a lot", "Dark", "some soil", "very tall", "red")]
        [InlineData("", "date_desc", "some Type A", "some Perennial", "a lot", "Dark", "some soil", "very tall", "red")]
        [InlineData("", "", "some Type A", "some Perennial", "a lot", "Dark", "some soil", "very tall", "red")]
        [InlineData("", "", "", "some Perennial", "a lot", "Dark", "some soil", "very tall", "red")]
        [InlineData("", "", "", "", "a lot", "Dark", "some soil", "very tall", "red")]
        [InlineData("", "", "", "", "", "Dark", "some soil", "very tall", "red")]
        [InlineData("", "", "", "", "", "", "", "very tall", "red")]
        [InlineData("", "", "", "", "", "", "", "", "red")]
        [InlineData("some description", "date_desc", "", "", "", "", "", "", "")]
        [InlineData("some description", "date_desc", "some Type A", "", "", "", "", "", "")]
        [InlineData("some description", "date_desc", "some Type A", "some Perennial", "", "", "", "", "")]
        [InlineData("some description", "date_desc", "some Type A", "some Perennial", "a lot", "", "", "", "")]
        [InlineData("some description", "date_desc", "some Type A", "some Perennial", "a lot", "Dark", "", "", "")]
        [InlineData("some description", "date_desc", "some Type A", "some Perennial", "a lot", "Dark", "some soil", "", "")]
        [InlineData("some description", "date_desc", "some Type A", "some Perennial", "a lot", "Dark", "some soil", "very tall", "")]

        public async Task FilterPlants(string searchString, string sortString, string typeString, string Perennial, string AmountOfWater, string Shadow, string Soil, string GrowthHeight, string Color)
        {
            var _context = MockContext.GetContext(nameof(GetAllPlants));
            var service = new PlantsService(_context);
            var response = service.FilterPLants(searchString, sortString, typeString, Perennial, AmountOfWater, Shadow, Soil, GrowthHeight, Color);
            var plants = from p in _context.Plants
                         where p.Available == true
                         select p;
            //filters
            if (!String.IsNullOrEmpty(typeString))
            {
                plants = plants.Where(b => b.Type.Equals(typeString));
            }

            if (!String.IsNullOrEmpty(Perennial))
            {
                plants = plants.Where(b => b.Perennial.Equals(Perennial));
            }

            if (!String.IsNullOrEmpty(AmountOfWater))
            {
                plants = plants.Where(b => b.AmountOfWater.Equals(AmountOfWater));
            }

            if (!String.IsNullOrEmpty(Shadow))
            {
                plants = plants.Where(b => b.Shadow.Equals(Shadow));
            }

            if (!String.IsNullOrEmpty(Soil))
            {
                plants = plants.Where(b => b.Soil.Equals(Soil));
            }

            if (!String.IsNullOrEmpty(GrowthHeight))
            {
                plants = plants.Where(b => b.GrowthHeigth.Equals(GrowthHeight));
            }

            if (!String.IsNullOrEmpty(Color))
            {
                plants = plants.Where(b => b.Color.Equals(Color));
            }
            //order filters
            switch (sortString)
            {
                case "date_asc":
                    plants = plants.OrderBy(s => s.Timestamp);
                    break;
                case "date_desc":
                    plants = plants.OrderByDescending(s => s.Timestamp);
                    break;
                default:
                    plants = plants.OrderBy(s => s.Timestamp);
                    break;
            }

            if (!String.IsNullOrEmpty(searchString))
            {
                plants = plants.Where(s => s.Name.Contains(searchString) || s.Description.Contains(searchString) || s.Color.Equals(searchString) || s.GrowthHeigth.Equals(searchString));
            }

             var test = plants.ToList();

            Assert.Equal(test.FirstOrDefault(), response.Result.FirstOrDefault());

        }
    }
}
