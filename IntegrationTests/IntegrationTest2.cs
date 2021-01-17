using FluentAssertions;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Project.Auth;
using Project.Controllers;
using Project.Models;
using Project.Services;
using ProjectC.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;
using XUnitTestProject1;

namespace Project.IntegrationTests
{
    public class IntegrationTest2 : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;
        private readonly TestServer _server;
        private readonly IJwtAuthManager _jwtAuthManager;
        private readonly IFriendsService _friendsService;

        public IntegrationTest2(WebApplicationFactory<Startup> factory)
        {
            // Arrange
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            _client = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureTestServices(services =>
                {
                    services.AddSingleton<IPolicyEvaluator, FakeAuth>();
                });
                builder.UseSolutionRelativeContentRoot("");
            }).CreateClient();
        }

        [Fact]
        public async Task GetUsersAuthenticated()
        {
            // Act
            var response = await _client.GetAsync("/api/Users");
            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetCurrentUserAuthorized()
        {
            // Act
            var response = await _client.GetAsync("/api/Users/current");
            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetUsersUnauthorized()
        {
            // Act
            var response = await _client.GetAsync("/api/Users");
            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetCurrentUserUnauthorized()
        {
            // Act
            var response = await _client.GetAsync("/api/Users/current");
            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Theory]
        [InlineData(2)]
        [InlineData(3)]
        public async Task GetExistingSpecificUser(int id)
        {
            // Act
            var response = await _client.GetAsync("/api/Users/" + id);
            var result = response.StatusCode;
            // Assert
            Assert.Equal(HttpStatusCode.OK, result);
        }


        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        [InlineData(30)]
        public async Task GetNonExistingSpecificUser(int id)
        {
            // Act
            var response = await _client.GetAsync("/api/Users/" + id);
            // Assert
            Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
        }

        [Fact]
        public async Task UpdateUserAuthorized()
        {
            int id = 1;
            var _username = "test";
            var _password = "password";
            var content = new StringContent($"username={_username}&password={_password}",
                Encoding.UTF8,
                "application/json");
            User user = new User { };
            // Act
            var response = await _client.PutAsync("/api/Users/current" + id, content);
            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }


        //[Fact]
        //public async Task PostUser()
        //{
        //    var _username = "testaaaaaaaaaaaaaaaaa";
        //    var _password = "password";
        //    var _email = "testaaaaaaaaaa@mail.nl";
        //    var _postalcode = "1234AA";

        //    var content = new StringContent($"username={_username}&password={_password}&email={_email}&postalcode={_postalcode}",
        //        Encoding.UTF8,
        //        "application/json");

        //    // Act
        //    var response = await _client.PostAsync("/api/Users/", content);
        //    // Assert
        //    Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        //}

        [Fact]
        public async Task PostUserValid()
        {
            User user = new User
            { };
            // Arrange
            var dbContext = MockContext.GetContext(nameof(PostUserValid));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);

            var controller = new UsersController(dbContext, _userService, _jwtAuthManager, _friendsService);

            var response = await controller.PostUser(user);

            dbContext.Dispose();

            // Assert
            response.Should().BeOfType<CreatedAtActionResult>();
        }


        [Fact]
        public async Task PostUserInValid()
        {
            User user = new User
            {
                Username = "test1",
                Email = "",
                Password = "",
                PostalCode = ""

            };
            // Arrange
            var dbContext = MockContext.GetContext(nameof(PostUserInValid));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);

            var controller = new UsersController(dbContext, _userService, _jwtAuthManager, _friendsService);

            var response = await controller.PostUser(user);

            dbContext.Dispose();

            // Assert
            response.Should().BeOfType<BadRequestObjectResult>();
        }

        [Fact]
        public async Task SearchUser()
        {
            var username = "test1";
            // Arrange
            var dbContext = MockContext.GetContext(nameof(SearchUser));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);

            var controller = new UsersController(dbContext, _userService, _jwtAuthManager, _friendsService);

            var response = await controller.Index(username);

            dbContext.Dispose();
            var result = response.Value;
            // Assert
            result.Should().BeOfType<List<User>>();
        }

        [Fact]
        public async Task LoginValid()
        {
            var loginResult = new LoginRequest
            {
                UserName = "test1",
                Password = "123456789"
            };
            // Arrange
            var dbContext = MockContext.GetContext(nameof(LoginValid));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);

            var controller = new UsersController(dbContext, _userService, _jwtAuthManager, _friendsService);

            var response = controller.Login(loginResult);

            dbContext.Dispose();

            // Assert
            response.Should().BeOfType<OkObjectResult>();
        }


        [Fact]
        public async Task LoginInValid()
        {
            var loginResult = new LoginRequest
            {
                UserName = "testaaaaaa",
                Password = "123456789"
            };
            // Arrange
            var dbContext = MockContext.GetContext(nameof(LoginInValid));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);

            var controller = new UsersController(dbContext, _userService, _jwtAuthManager, _friendsService);

            var response = controller.Login(loginResult);

            dbContext.Dispose();

            // Assert
            response.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public async Task Logout()
        {
            var loginResult = new LoginRequest
            {
                UserName = "Test",
                Password = "123456789"
            };
            // Arrange
            var dbContext = MockContext.GetContext(nameof(Logout));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);

            var controller = new UsersController(dbContext, _userService, _jwtAuthManager, _friendsService);

            var response = controller.Logout();

            dbContext.Dispose();

            // Assert
            response.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public async Task GetPlants()
        {
            // Act
            var response = await _client.GetAsync("/api/Plants");
            var result = response.StatusCode;
            // Assert
            Assert.Equal(HttpStatusCode.OK, result);
        }

        [Fact]
        public async Task GetChosenUserPlants()
        {
            int id = 1;
            // Act
            var response = await _client.GetAsync("/api/Plants/ChosenUserPlants" + id);
            var result = response.StatusCode;
            // Assert
            Assert.Equal(HttpStatusCode.OK, result);
        }

        [Fact]
        public async Task GetUserPlants()
        {
            // Act
            var response = await _client.GetAsync("/api/Plants/UserPlants");
            var result = response.StatusCode;
            // Assert
            Assert.Equal(HttpStatusCode.OK, result);
        }

        [Fact]
        public async Task GetSpecificPlant()
        {
            int id = 1;
            // Act
            var response = await _client.GetAsync("/api/Plants/" + id);
            var result = response.StatusCode;
            // Assert
            Assert.Equal(HttpStatusCode.OK, result);
        }

        [Fact]
        public async Task UpdatePlantAuthorized()
        {
            int id = 1;
            var name = "test";
            var description = "plant";
            var content = new StringContent($"name={name}&description={description}",
                Encoding.UTF8,
                "application/json");

            // Act
            var response = await _client.PutAsync("/api/Plants/" + id, content);
            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task UpdatePlantAvailabilityAuthorized()
        {
            int id = 1;
            var name = "test";
            var description = "plant";
            var content = new StringContent($"name={name}&description={description}",
                Encoding.UTF8,
                "application/json");

            // Act
            var response = await _client.PutAsync("/api/Plants/setAvailable", content);
            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task PostPlantAuthorized()
        {
            var name = "test";
            var description = "plant";
            var content = new StringContent($"name={name}&description={description}",
                Encoding.UTF8,
                "application/json");

            // Act
            var response = await _client.PostAsync("/api/Plants", content);
            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task GetUnauthAdmins()
        {
            // Act
            var response = await _client.GetAsync("/api/Admins/");
            var result = response.StatusCode;
            // Assert
            Assert.Equal(HttpStatusCode.OK, result);
        }

        [Fact]
        public async Task GetUnauthSpecificAdmin()
        {
            // Act
            var response = await _client.GetAsync("/api/Admins/1");
            var result = response.StatusCode;
            // Assert
            Assert.Equal(HttpStatusCode.OK, result);
        }

        [Fact]
        public async Task UpdateAdminUnauthorized()
        {
            int id = 1;
            var _username = "test";
            var _password = "password";
            var content = new StringContent($"username={_username}&password={_password}",
                Encoding.UTF8,
                "application/json");
            // Act
            var response = await _client.PutAsync("/api/Admin/" + id, content);
            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

        [Fact]
        public async Task PostAdminValid()
        {
            Admin admin = new Admin
            {
                Username = "testA",
                Password = "password"
            };
            // Arrange
            var dbContext = MockContext.GetContext(nameof(PostAdminValid));
            dbContext.Seed();
            var _userService = new UserService(null, dbContext);

            var controller = new AdminsController(dbContext, _userService, _jwtAuthManager);

            var response = await controller.PostAdmin(admin);

            dbContext.Dispose();
            var result = response.Result;

            // Assert
            result.Should().BeOfType<CreatedAtActionResult>();
        }

        [Fact]
        public async Task DeleteAdminValid()
        {
            // Arrange
            var dbContext = MockContext.GetContext(nameof(PostAdminValid));

            var _userService = new UserService(null, dbContext);

            var controller = new AdminsController(dbContext, _userService, _jwtAuthManager);

            var response = await controller.DeleteAdmin(1);
            var result = response.Result;

            dbContext.Dispose();

            // Assert
           Assert.Equal((HttpStatusCode.OK.ToString()), (result.ToString()));
        }

        //[Fact]
        //public async Task GetUsersAsync()
        //{
        //    // Act
        //    var response = await _client.GetAsync("/api/Users");
        //    // Assert
        //    Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        //}
    }
}
