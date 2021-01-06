using Project.Auth;
using Project.Services;
using ProjectC.Controllers;
using System;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Project;
using Moq;
using System.Linq;
using Microsoft.Extensions.Logging;
using static Project.Services.UserService;
using Project.Models;

namespace XUnitTestProject1
{
    public class UnitTest1
    {
        private readonly IJwtAuthManager _jwtAuthManager;
        private readonly IFriendsService _friendsService;

        [Fact]
        public async Task GetAllUsersAsync()
        {
            // Arrange
            var _context = MockContext.GetContext("test");
            _context.Seed();
            var _userService = new UserService(null, _context);

            var controller = new UsersController(_context, _userService, _jwtAuthManager, _friendsService);

            var response = await controller.GetUsers();

            _context.Dispose();

            // Assert
            Assert.NotNull(response);
        }
        [Fact]
        public async Task GetUserAsync()
        {
            int id = 1;
            // Arrange
            var dbContext = MockContext.GetContext(nameof(GetUserAsync));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);

            var controller = new UsersController(dbContext, _userService, _jwtAuthManager, _friendsService);

            var response = await controller.GetUser(id);
            var result = response.Value;

            dbContext.Dispose();

            // Assert
            Assert.IsType<User>(result);
        }

        [Theory]
        [InlineData(-1)]
        [InlineData(0)]
        [InlineData(10)]
        public async Task GetNonExistingUser(int id)
        {
            // Arrange
            var dbContext = MockContext.GetContext(nameof(GetNonExistingUser));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);
            var controller = new UsersController(dbContext, _userService, _jwtAuthManager, _friendsService);
            var response = await controller.GetUser(id);
            var result = response.Result;

            dbContext.Dispose();

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Theory]
        [InlineData("test1")]
        [InlineData("test2")]
        [InlineData("test")]
        public async Task isExistingUser(string username)
        {
            var dbContext = MockContext.GetContext(nameof(isExistingUser));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);
            var service = _userService;
            var response = service.IsAnExistingUser(username);
            if (response)
            {
                Assert.True(response);
            }
            Assert.False(response);
        }

        [Theory]
        [InlineData("test1", "password")]
        [InlineData("test2", "")]
        [InlineData("test", "test1")]
        [InlineData("", "test1")]
        [InlineData("", "")]
        public async Task ValidFalseCredentials(string username, string password)
        {
            var dbContext = MockContext.GetContext(nameof(ValidFalseCredentials));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);
            var service = _userService;
            var response = service.IsValidUserCredentials(username, password);
            Assert.False(response);
        }

        [Fact]
        public async Task ValidTrueCredentials()
        {
            var username = "test1";
            var password = "123456789";

            var dbContext = MockContext.GetContext(nameof(ValidTrueCredentials));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);
            var response = _userService.IsValidUserCredentials(username, password);

            dbContext.Dispose();
            Assert.True(response);
        }

        [Fact]
        public async Task GetUserRoleWithExistingUser()
        {
            var username = "test1";

            var dbContext = MockContext.GetContext(nameof(GetUserRoleWithExistingUser));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);
            var response = _userService.GetUserRole(username);

            dbContext.Dispose();

            Assert.Equal("User",response);
        }

        [Fact]
        public async Task GetUserRoleWithNonExistingUser()
        {
            var username = "non existing user";

            var dbContext = MockContext.GetContext(nameof(GetUserRoleWithNonExistingUser));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);
            var response = _userService.GetUserRole(username);

            dbContext.Dispose();

            Assert.Equal("", response);
        }


        [Fact]
        public async Task IsExistingAdmin()
        {
            var username = "Admin1";

            var dbContext = MockContext.GetContext(nameof(IsExistingAdmin));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);
            var response = _userService.IsAnExistingAdmin(username);

            dbContext.Dispose();

            Assert.True(response);
        }

        [Fact]
        public async Task IsNonExistingAdmin()
        {
            var username = "Admin2";

            var dbContext = MockContext.GetContext(nameof(IsNonExistingAdmin));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);
            var response = _userService.IsAnExistingAdmin(username);

            dbContext.Dispose();

            Assert.False(response);
        }

        [Fact]
        public async Task GetExistingAdminRole()
        {
            var username = "Admin1";

            var dbContext = MockContext.GetContext(nameof(GetExistingAdminRole));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);
            var response = _userService.GetUserRole(username);

            dbContext.Dispose();

            Assert.Equal("Admin",response);
        }

        [Fact]
        public async Task GetNonExistingAdminRole()
        {
            var username = "Admin2";

            var dbContext = MockContext.GetContext(nameof(GetNonExistingAdminRole));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);
            var response = _userService.GetUserRole(username);

            dbContext.Dispose();

            Assert.Equal("", response);
        }


        [Theory]
        [InlineData("Admin2", "password")]
        [InlineData("Admin1", "")]
        [InlineData("", "wrong")]
        [InlineData("", "password")]
        [InlineData("", "")]
        public async Task ValidFalseAdminCredentials(string username, string password)
        {
            var dbContext = MockContext.GetContext(nameof(ValidFalseAdminCredentials));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);
            var service = _userService;
            var response = service.IsValidUserCredentials(username, password);
            Assert.False(response);
        }

        [Fact]
        public async Task ValidAdminCredentials()
        {
            var username = "Admin1";
            var password = "password";

            var dbContext = MockContext.GetContext(nameof(ValidAdminCredentials));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);
            var response = _userService.IsValidAdminCredentials(username, password);

            dbContext.Dispose();
            Assert.True(response);
        }

        [Fact]
        public async Task IsExistingFriendshipWithExistingFriendship()
        {
            int Id1 = 1;
            int Id2 = 2;
            var dbContext = MockContext.GetContext(nameof(IsExistingFriendshipWithExistingFriendship));
            dbContext.Seed();
            var friendService = new FriendService(null, dbContext);

            var response = friendService.IsExistingFriendship(Id1,Id2);

            dbContext.Dispose();
            Assert.True(response);
        }


        [Fact]
        public async Task IsExistingFriendshipWithNonExistingFriendship()
        {
            int Id1 = 1;
            int Id2 = 4;
            var dbContext = MockContext.GetContext(nameof(IsExistingFriendshipWithNonExistingFriendship));
            dbContext.Seed();
            var friendService = new FriendService(null, dbContext);

            var response = friendService.IsExistingFriendship(Id1, Id2);

            dbContext.Dispose();
            Assert.False(response);
        }

        [Fact]
        public async Task GetNotConfirmedFriends()
        {
            int Id = 1;
            var dbContext = MockContext.GetContext(nameof(GetNotConfirmedFriends));
            dbContext.Seed();
            var friendService = new FriendService(null, dbContext);

            var response = friendService.NotConfirmedFriends(Id);

            dbContext.Dispose();
            Assert.IsType<List<User>>(response);
        }

        [Fact]
        public async Task GetNotConfirmedFriendsWithNotExistingUser()
        {
            int Id = 5;
            var dbContext = MockContext.GetContext(nameof(GetNotConfirmedFriendsWithNotExistingUser));
            dbContext.Seed();
            var friendService = new FriendService(null, dbContext);

            var response = friendService.NotConfirmedFriends(Id);

            dbContext.Dispose();
            Assert.Null(response);
        }

        [Fact]
        public async Task GetConfirmedFriends()
        {
            int Id = 1;
            var dbContext = MockContext.GetContext(nameof(GetConfirmedFriends));
            dbContext.Seed();
            var friendService = new FriendService(null, dbContext);

            var response = friendService.ConfirmedFriends(Id);

            dbContext.Dispose();
            Assert.IsType<List<User>>(response);
        }

        [Fact]
        public async Task GetConfirmedFriendsWithNotExistingUser()
        {
            int Id = 5;
            var dbContext = MockContext.GetContext(nameof(GetConfirmedFriendsWithNotExistingUser));
            dbContext.Seed();
            var friendService = new FriendService(null, dbContext);

            var response = friendService.ConfirmedFriends(Id);

            dbContext.Dispose();
            Assert.Null(response);
        }

        [Theory]
        [InlineData(1,2)]
        [InlineData(1, 3)]
        public async Task GetSpecificRequest(int Id1, int Id2)
        {
            var dbContext = MockContext.GetContext(nameof(GetSpecificRequest));
            dbContext.Seed();
            var friendService = new FriendService(null, dbContext);

            var response = friendService.SpecificRequest(Id1, Id2);

            dbContext.Dispose();
            Assert.IsType<FriendRequest>(response);
        }

        [Theory]
        [InlineData(2, 3)]
        [InlineData(4, 5)]
        public async Task GetSpecificNonExistingRequest(int Id1, int Id2)
        {
            var dbContext = MockContext.GetContext(nameof(GetSpecificNonExistingRequest));
            dbContext.Seed();
            var friendService = new FriendService(null, dbContext);

            var response = friendService.SpecificRequest(Id1, Id2);

            dbContext.Dispose();
            Assert.Null(response);
        }
    }
}
