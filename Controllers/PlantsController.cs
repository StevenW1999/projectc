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
using Project.Services;

namespace Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantsController : ControllerBase
    {
        private readonly ProjectCContext _context;
        private readonly IPlantsService _plantsService;

        public PlantsController(ProjectCContext context, IPlantsService plantsService)
        {
            _context = context;
            _plantsService = plantsService;
        }

        // GET: api/Plants
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plant>>> getPLants()
        {
            return await _plantsService.GetPLants();
        }

        // GET: api/Plants/UserPLants
        [Authorize]
        [HttpGet("UserPlants")]
        public async Task<ActionResult<IEnumerator<Plant>>> GetUserPlants()
        {
            User user = GetCurrentUser();

            if (isAuthenticated())
            {
                return Ok(await _plantsService.GetUserPLants(user.Id));
            }
            return BadRequest("Not logged in");
        }

        // GET: api/Plants/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Plant>> GetPlant(int id)
        {
            var plant = await _plantsService.GetSpecificPLant(id); //find specific plant with id
            if (plant == null)
            {
                return NotFound(); //return notfound if there isn't any
            }
            return Ok(plant); //return the plant
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

        //PUT: api/Plants/5
        [Authorize]
        [HttpPut("setAvailable")]
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
                    await _plantsService.UpdatePlantAvailability(plant);
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
                await _plantsService.AddPlant(plant, user);
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
            var plant = await _plantsService.DeletePlant(id, user);
            if(plant != null)
            {
                return Ok(plant);
            }
            return NotFound();
        }

        //GET: api/plants/search?searchString=
        [AllowAnonymous]
        [HttpGet("search")]
        public async Task<IActionResult> Index(string searchString, string sortString, string typeString, string Perennial, string AmountOfWater, string Shadow, string Soil, string GrowthHeight, string Color)
        {
            //get all plants
            var plants = await _plantsService.FilterPLants(searchString, sortString, typeString, Perennial, AmountOfWater, Shadow, Soil, GrowthHeight, Color);
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
