using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;
using ProjectC;

namespace ProjectC.Services
{
    public interface IUserService
    {
        bool IsAnExistingUser(string userName);
        bool IsValidUserCredentials(string userName, string password);
        string GetUserRole(string userName);
        bool IsValidAdminCredentials(string userName, string password);
        bool IsAnExistingAdmin(string userName);
    }
    //basic userservice
    public class UserService : IUserService
    {
        private readonly ILogger<UserService> _logger;
        private readonly ProjectCContext _context;
        public UserService(ILogger<UserService> logger, ProjectCContext context)
        {
            _logger = logger;
            _context = context;
        }

        public bool IsValidUserCredentials(string userName, string password)
        {
            _logger.LogInformation($"Validating user [{userName}]");
            if (string.IsNullOrWhiteSpace(userName))
            {
                return false;
            }

            if (string.IsNullOrWhiteSpace(password))
            {
                return false;
            }
            return _context.Users.Any(u => u.Username == userName && u.Password == password);
        }

        public bool IsAnExistingUser(string userName)
        {
            return _context.Users.Any(u => u.Username == userName);
        }
       
        public string GetUserRole(string userName)
        {
            if (IsAnExistingUser(userName))
            {
                return UserRoles.User;
            }

            if (IsAnExistingAdmin(userName))
            {
                return UserRoles.Admin;
            }

            return string.Empty;
        }

        public static class UserRoles
        {
            public const string Admin = nameof(Admin);
            public const string User = nameof(User);
        }

        public bool IsValidAdminCredentials(string userName, string password)
        {
            _logger.LogInformation($"Validating admin [{userName}]");
            if (string.IsNullOrWhiteSpace(userName))
            {
                return false;
            }

            if (string.IsNullOrWhiteSpace(password))
            {
                return false;
            }
            return _context.Admins.Any(u => u.Username == userName && u.Password == password);
        }
        public bool IsAnExistingAdmin(string userName)
        {
            return _context.Admins.Any(u => u.Username == userName);
        }
    }
}