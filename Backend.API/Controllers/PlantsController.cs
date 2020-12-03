using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ProjectC.Controllers
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
            var userId = GetCurrentUserId();

            if (isAuthenticated())
            {
                var plants = from p in _context.Plants
                             where p.UserId == userId
                             select p;
                return Ok(plants);
            }
            return BadRequest("Not logged in");
        }

        // GET: api/Plants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Plant>> GetPlant(int id)
        {
            var plant = await _context.Plants.FindAsync(id);
            if (plant == null)
            {
                return NotFound();
            }
            return plant;
        }

        // PUT: api/Plants/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlant(int id, Plant plant)
        {
            var userId = GetCurrentUserId();

            if (isAuthenticated())
            {
                if (id != plant.Id)
                {
                    return BadRequest();
                }
                if (plant.UserId == userId)
                {
                    _context.Entry(plant).State = EntityState.Modified;
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
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> setAvailable(int id, Plant plant)
        {
            var userId = GetCurrentUserId();

            if (isAuthenticated())
            {
                if (id != plant.Id)
                {
                    return BadRequest();
                }
                if (plant.UserId == userId)
                {
                    plant.Available = !plant.Available;
                }
            }
            return NoContent();
        }


        // POST: api/Plants
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
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

                _context.Plants.Add(plant);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetPlant", new { id = plant.Id, UserId = GetCurrentUserId(), Available = true, TimeStamp = new DateTime() }, plant);
            }
            return NotFound();
        }

        // DELETE: api/Plants/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Plant>> DeletePlant(int id)
        {
            var plant = await _context.Plants.FindAsync(id);
            if (plant == null)
            {
                return NotFound();
            }

            _context.Plants.Remove(plant);
            await _context.SaveChangesAsync();

            return plant;
        }

        //GET: api/plants/search?searchString=
        [HttpGet("search")]
        public async Task<IActionResult> Index(string searchString, string sortString, string typeString, bool Available)
        {
            var plants = from p in _context.Plants
                         where p.Available == true
                         select p;
            if (!Available)
            {
                plants = plants.Where(s => s.Available == false);
            }

            if (!String.IsNullOrEmpty(typeString))
            {
                plants = plants.Where(s => s.Type.Equals(typeString));
            }


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
                plants = plants.Where(s => s.Name.Contains(searchString) || s.Description.Contains(searchString) || s.Color.Equals(searchString) || s.GrowthHeigth.Equals(searchString) || s.Type.Contains(searchString));
            }
            return Ok(plants);
        }

        private bool PlantExists(int id)
        {
            return _context.Plants.Any(e => e.Id == id);
        }
        private bool isAuthenticated()
        {
            if (User.Identity.IsAuthenticated)
            {
                return true;
            }
            return false;
        }

        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userId = int.TryParse(userIdClaim, out var id) ? id : 0;
            return userId;

        }

    }
}
