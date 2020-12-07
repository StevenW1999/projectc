using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project;

namespace Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantsController : ControllerBase
    {
        private readonly ProjectCContext _context;

        public PlantsController(ProjectCContext context)
        {
            _context = context;
        }

        // GET: api/Plants
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plant>>> getPLants()
        {
            return await _context.Plants.ToListAsync();
        }

        // GET: api/Plants/UserPLants
        [Authorize]
        [HttpGet("UserPlants")]
        public async Task<ActionResult<IEnumerator<Plant>>> GetUserPlants()
        {
            User user = GetCurrentUser();

            if (isAuthenticated())
            {
                var plants = from p in _context.Plants
                             where p.UserId == user.Id
                             select p; //query to find all plants with userId equal to the current userId

                return Ok(plants);
            }
            return BadRequest("Not logged in");
        }

        // GET: api/Plants/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Plant>> GetPlant(int id)
        {
            var plant = await _context.Plants.FindAsync(id); //find specific plant with id
            if (plant == null)
            {
                return NotFound(); //return notfound if there isn't any
            }
            return plant; //return the plant
        }

        // PUT: api/Plants/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlant(int id, Plant plant)
        {
            User user = GetCurrentUser();

            if (isAuthenticated()) //check if user is logged in
            {
                if (id != plant.Id)
                {
                    return BadRequest(); //check the id of the plant given for unmatching id's
                }
                if (plant.UserId == user.Id)
                {
                    _context.Entry(plant).State = EntityState.Modified; //update the plant
                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException)
                    {
                        if (!PlantExists(id))
                        {
                            return NotFound();
                        }
                        else
                        {
                            throw;
                        }
                    }
                }
            }
            return NoContent();
        }

        // PUT: api/Plants/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> setAvailable(int id, Plant plant)
        {
            User user = GetCurrentUser();

            if (isAuthenticated())
            {
                if (id != plant.Id)
                {
                    return BadRequest();
                }
                if (plant.UserId == user.Id) //if user is logged in and the plant belongs the user, set the availability to the current opposite
                {
                    plant.Available = !plant.Available;
                    return Ok(plant);
                }
            }
            return NoContent();
        }


        // POST: api/Plants
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Plant>> PostPlant(Plant plant)
        {
            if (isAuthenticated())
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                User user = GetCurrentUser();
                plant.User = user; //set the owner of the plant to the current user
                plant.Available = true; //standard available is true
                plant.Timestamp = DateTime.Now; // timestamp is the time that the request is made
                _context.Plants.Add(plant); //add the plant from the request
                await _context.SaveChangesAsync(); //save the database state

                return Ok(plant); //return Ok result with the plant
            }
            return NotFound(); //return notFound if something goes wrong
        }

        // DELETE: api/Plants/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Plant>> DeletePlant(int id)
        {
            User user = GetCurrentUser();
            var plant = await _context.Plants.FindAsync(id);
            if (plant == null)
            {
                return NotFound();
            }
            if (plant.UserId == user.Id)
            {
                _context.Plants.Remove(plant); //check if plant belongs to user and deletes the plant if so
                await _context.SaveChangesAsync();
            }
            return plant;
        }

        //GET: api/plants/search?searchString=
        [AllowAnonymous]
        [HttpGet("search")]
        public async Task<IActionResult> Index(string searchString, string sortString, string typeString, string Perennial, string AmountOfWater, string Shadow, string Soil, string GrowthHeight, string Color)
        {
            //get all plants
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

            return Ok(plants);
            }
 

        private bool PlantExists(int id)
        {
            return _context.Plants.Any(e => e.Id == id);
        }
        private bool isAuthenticated() //helper function to check if user is authenticated
        {
            if (User.Identity.IsAuthenticated)
            {
                return true;
            }
            return false;
        }

        //helper function to get the current logged in user
        private User GetCurrentUser()
        {
            User user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name); //query to find user with username found in the token
            return user;
        }
    }
}
