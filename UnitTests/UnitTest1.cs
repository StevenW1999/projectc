using Project.Auth;
using Project.Services;
using ProjectC.Controllers;
using System;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Project;

namespace XUnitTestProject1
{
    public class UnitTest1
    {
        private readonly MockUserService _userService;
        private readonly IJwtAuthManager _jwtAuthManager;
        private readonly IFriendsService _friendsService;

        [Fact]
        public async Task GetAllUsersAsync()
        {
            // Arrange

            var dbContext = MockContext.GetContext(nameof(GetAllUsersAsync));
            var controller = new UsersController(dbContext, _userService, _jwtAuthManager, _friendsService);

            var response = await controller.GetUsers();

            dbContext.Dispose();

            // Assert
            Assert.NotNull(response);
        }
        [Fact]
        public async Task GetUserAsync()
        {
            int id = 1;
            // Arrange
            var dbContext = MockContext.GetContext(nameof(GetAllUsersAsync));
            var controller = new UsersController(dbContext, _userService, _jwtAuthManager, _friendsService);

            var response = await controller.GetUser(id);
            var result = response.Value;

            dbContext.Dispose();

            // Assert
            Assert.IsType<User> (result);
        }

        [Theory]
        [InlineData(-1)]
        [InlineData(0)]
        [InlineData(10)]
        public async Task GetNonExistingUser(int id)
        {
            // Arrange
            var dbContext = MockContext.GetContext(nameof(GetAllUsersAsync));
            var controller = new UsersController(dbContext, _userService, _jwtAuthManager, _friendsService);

            var response = await controller.GetUser(id);
            var result = response.Result;

            dbContext.Dispose();

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

    }
}
