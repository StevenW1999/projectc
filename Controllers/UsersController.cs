using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Project.Models;
using Microsoft.IdentityModel.Tokens;
using Project.Services;
using Project;
using System.Text;

namespace ProjectC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        //import services and context
        private readonly ProjectCContext _context;
        private readonly IJwtAuthManager _jwtAuthManager;
        private readonly IUserService _userService;
        private readonly IFriendsService _friendsService;

        public UsersController(ProjectCContext context, IUserService userService, IJwtAuthManager jwtAuthManager, IFriendsService friendsService) //controller constructor
        {
            //to use them in the controller
            _context = context;
            _jwtAuthManager = jwtAuthManager;
            _userService = userService;
            _friendsService = friendsService;
        }

        // GET: api/Users
        [HttpGet]
        [Authorize] //use authorize tags to determine which actions need authorization
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _userService.GetUsers(); //return all users in a list
        }

        // GET: api/Users
        [HttpGet("current")]
        [Authorize] //use authorize tags to determine which actions need authorization
        public ActionResult<User> GetCurrentUser()
        {
            User user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name); //query to find user with username found in the token
            return user;
        }

        // GET: api/Users/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = _userService.GetSpecificUser(id);

            if (user == null)
            {
                return NotFound();
            }

            return await user;
        }

        // PUT: api/Users/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            //check if given id is equal to the id of the user to be edited
            var local = CurrUser();

            // check if local is not null 
            if (local != null)
            {
                // detach
                _context.Entry(local).State = EntityState.Detached;
            }

            if (id != user.Id)
            {
                return BadRequest();
            }
            //check if the updated username exists or not
            if (_userService.IsAnExistingUser(user.Username))
            {
                if (local.Username == user.Username)
                {
                    _context.Entry(user).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                return BadRequest();
            }

            if (_userService.IsAnExistingEmail(user.Email))
            {
                if (local.Email == user.Email)
                {
                    _context.Entry(user).State = EntityState.Modified;
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                return BadRequest();
            }
            //update user
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        // POST: api/Users
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> PostUser(User user)
        {
            try
            {
                //check if model is valid
                if (ModelState.IsValid)
                {
                    //check if there is an user with the given username, if not then:
                    if (!_userService.IsAnExistingUser(user.Username))
                    {
                        //var image = Encoding.ASCII.GetString(user.ProfilePicture);
                        //user.ProfilePicture = Convert.FromBase64String(image);
                        if (!_userService.IsAnExistingEmail(user.Email))
                        {
                            _context.Add(user);
                            await _context.SaveChangesAsync();
                            return CreatedAtAction("GetUser", new { id = user.Id }, user);
                        }

                    }
                }
            }
            catch (DbUpdateException /* ex */)
            {
                //Log the error (uncomment ex variable name and write a log.
                ModelState.AddModelError("", "Unable to save changes. " +
                    "Try again, and if the problem persists " +
                    "see your system administrator.");
            }
            return BadRequest("Error while creating user!");
        }

        // DELETE: api/Users/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _userService.GetSpecificUser(id);
            User currUser = CurrUser();
            if (user == null)
            {
                return NotFound();
            }
            if (user.Id != currUser.Id)
            {
                return BadRequest("This is not you!");
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        //search for specific user
        [AllowAnonymous]
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<User>>> Index (string searchString)
        {
            return await _userService.GetSpecificUserByName(searchString);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginRequest request)
        {
            //check if login request is valid
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            //error if login credentials are invalid
            if (!_userService.IsValidUserCredentials(request.UserName, request.Password))
            {
                return Unauthorized();
            }

            var role = _userService.GetUserRole(request.UserName);

            //create new claim
            var claims = new[]
            {
                new Claim(ClaimTypes.Name,request.UserName),
                new Claim(ClaimTypes.Role, role)
            };

            //create token
            var jwtResult = _jwtAuthManager.GenerateTokens(request.UserName, claims, DateTime.Now);

            //return bearer token 
            return Ok(new LoginResult
            {
                UserName = request.UserName,
                Role = role,
                AccessToken = jwtResult.AccessToken,
                RefreshToken = jwtResult.RefreshToken.TokenString
            });
        }

        //[HttpGet("user")]
        //[Authorize]
        //public ActionResult GetCurrentUser()
        //{
        //    return Ok(new LoginResult
        //    {
        //        UserName = User.Identity.Name,
        //        Role = User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty,
        //        OriginalUserName = User.FindFirst("OriginalUserName")?.Value
        //    });
        //}

        [HttpPost("logout")]
        [Authorize]
        public ActionResult Logout()
        {
            //remove token with username of the current logged in user
            var userName = User.Identity.Name;
            _jwtAuthManager.RemoveRefreshTokenByUserName(userName);
            return Ok();
        }

        [HttpPost("refresh-token")]
        [Authorize]
        public async Task<ActionResult> RefreshToken([FromBody] Project.Models.RefreshToken request)
        {
            try
            {
                var userName = User.Identity.Name;

                if (string.IsNullOrWhiteSpace(request.RToken))
                {
                    return Unauthorized();
                }

                //get new token
                var accessToken = await HttpContext.GetTokenAsync("Bearer", "access_token");

                //make new current user token with the now token added
                var jwtResult = _jwtAuthManager.Refresh(request.RToken, accessToken, DateTime.Now);

                //return new token
                return Ok(new LoginResult
                {
                    UserName = userName,
                    Role = User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty,
                    AccessToken = jwtResult.AccessToken,
                    RefreshToken = jwtResult.RefreshToken.TokenString
                });
            }
            catch (SecurityTokenException e)
            {
                return Unauthorized(e.Message); // return 401 so that the client side can redirect the user to login page
            }
        }
        //todo: Check FriendTo = null bug

        [HttpPost("FriendAdd")]
        [Authorize]
        public async Task<IActionResult> FriendAdd(string Username)
        {
            var user = CurrUser();
            var Friend = _context.Users.FirstOrDefault(u => u.Username == Username);

            try
            {
                //check if model is valid
                if (ModelState.IsValid)
                {
                    if (Friend != null)
                    {
                        if (!_friendsService.IsExistingFriendship(user.Id, Friend.Id))
                        {
                            FriendRequest friendRequest = new FriendRequest
                            {
                                IsConfirmed = false,
                                Friend1 = user,
                                Friend1Id = user.Id,
                                Friend2 = Friend,
                                Friend2Id = Friend.Id
                            };

                            _context.Add(friendRequest);
                            await _context.SaveChangesAsync();
                            return Ok(friendRequest);
                        }
                        return BadRequest("Friendship already exists!");
                    }
                    return NotFound("user not found");
                }
            }
            catch (DbUpdateException /* ex */)
            {
                //Log the error (uncomment ex variable name and write a log.
                ModelState.AddModelError("", "Unable to save changes. " +
                    "Try again, and if the problem persists " +
                    "see your system administrator.");
            }
            return BadRequest("Something went wrong!");
        }

        [HttpGet("ConfirmedFriends")]
        [Authorize]
        public ActionResult ConfirmedFriendsList()
        {
            var Friends = _friendsService.ConfirmedFriends(CurrUser().Id);
            if (Friends == null)
            {
                return NotFound("No friends yet!");
            }
            if (Friends != null)
            {
                return Ok(Friends);
            }
            return BadRequest("Something went wrong!");
        }

        [HttpGet("NotConfirmedFriends")]
        [Authorize]
        public ActionResult NotConfirmedFriendsList()
        {
            var Friends = _friendsService.NotConfirmedFriends(CurrUser().Id);
            if(Friends == null)
            {
                return NotFound("No friends yet!");
            }
            if(Friends != null)
            {
                return Ok(Friends);
            }
            return BadRequest("Something went wrong!");
        }

        [HttpPut("ConfirmFriend")]
        [Authorize]
        public ActionResult ConfirmFriend(string Username)
        {
            var User = CurrUser();
            var Friend = _context.Users.FirstOrDefault(u => u.Username == Username);
            if (!_userService.IsAnExistingUser(Username))
            {
                return NotFound("User does not exist");
            }
            if(_friendsService.IsExistingFriendship(User.Id, Friend.Id))
            {
                var Request = _friendsService.SpecificRequest(User.Id, Friend.Id);
                Request.IsConfirmed = true;
                _context.SaveChanges();
                return Ok(Request);
            }
            return NotFound("You are not friends yet!");
        }


        [HttpDelete("DeleteFriend")]
        [Authorize]
        public async Task<IActionResult> DeleteFriend(string Username)
        {
            var User = CurrUser();
            var Friend = _context.Users.FirstOrDefault(u => u.Username == Username);
            if (!_userService.IsAnExistingUser(Username))
            {
                return NotFound("User does not exist");
            }
            if (_friendsService.IsExistingFriendship(User.Id, Friend.Id))
            {
                var Request = _friendsService.SpecificRequest(User.Id, Friend.Id);
                _context.FriendRequests.Remove(Request);
                await _context.SaveChangesAsync();
                return Ok("Friend " + Username +  " deleted");
            }
            return NotFound("You are not friends yet!");
        }
        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        private User CurrUser()
        {
            User user = _context.Users.FirstOrDefault(u => u.Username == User.Identity.Name); //query to find user with username found in the token
            return user;
        }
    }
}
