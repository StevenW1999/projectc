using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Services
{
    public interface IPlantsService
    {
        Task<List<Plant>> GetPLants();
        Task<List<Plant>> GetUserPLants(int Id);
        Task<Plant> GetSpecificPLant(int Id);
        Task<Plant> UpdatePlantAvailability(Plant plant);
        Task<Plant> AddPlant(Plant plant, User user);
        Task<Plant> DeletePlant(int Id, User user);
        Task<List<Plant>> FilterPLants(string searchString, string sortString, string typeString, string Perennial, string AmountOfWater, string Shadow, string Soil, string GrowthHeight, string Color);

    }
    public class PlantsService : IPlantsService
    {
        private readonly ProjectCContext _context;

        public PlantsService(ProjectCContext context)
        {
            _context = context;
        }

        public async Task<List<Plant>> GetPLants()
        {
            return await _context.Plants.ToListAsync();
        }

        public async Task<List<Plant>> GetUserPLants(int Id)
        {
            var plants = _context.Plants.Where(u => u.UserId == Id).ToListAsync();
            return await plants;
        }
        public async Task<Plant> GetSpecificPLant(int Id)
        {
            var plant = await _context.Plants.FindAsync(Id);
            if(plant != null)
            {
                return plant;
            }
            return null;
        }
        public async Task<Plant> UpdatePlantAvailability(Plant plant)
        {
            plant.Available = !plant.Available;
            await _context.SaveChangesAsync();
            return plant;
        }
        //was eerst zonder userId = user.id
        public async Task<Plant> AddPlant(Plant plant, User user)
        {
            user.Plants.Add(plant);
            plant.User = user;
            plant.UserId = user.Id;
            plant.Available = true; 
            plant.Timestamp = DateTime.Now; 
            _context.Plants.Add(plant); 
            await _context.SaveChangesAsync(); 
            return plant;
        }
        public async Task<Plant> DeletePlant(int Id, User user)
        {
            var plant = await GetSpecificPLant(Id);
            if(plant != null)
            {
                if(plant.UserId == user.Id)
                {
                    _context.Plants.Remove(plant);
                    await _context.SaveChangesAsync();
                    return plant;
                }
                return null;
            }
            return null;
        }
        public async Task<List<Plant>> FilterPLants(string searchString, string sortString, string typeString, string Perennial, string AmountOfWater, string Shadow, string Soil, string GrowthHeight, string Color)
        {
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

            return await plants.ToListAsync();
        }
    }
}
