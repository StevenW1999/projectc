using FluentAssertions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Project.Auth;
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
    public class IntegrationTest1
    {
        private readonly TestServer _server;
        private readonly HttpClient _client;
        private readonly IJwtAuthManager _jwtAuthManager;
        private readonly IFriendsService _friendsService;

        public IntegrationTest1()
        {
            // Arrange
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            _server = new TestServer(new WebHostBuilder()
                .UseConfiguration(configuration)
                .UseStartup<Startup>()
                );
            _client = _server.CreateClient();
        }

        [Fact]
        public async Task GetUsersUnauthorized()
        {
            // Act
            var response = await _client.GetAsync("/api/Users");
            // Assert
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Fact]
        public async Task GetCurrentUserUnauthorized()
        {
            // Act
            var response = await _client.GetAsync("/api/Users/current");
            // Assert
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public async Task GetExistingSpecificUser(int id)
        {
            // Act
            var response = await _client.GetAsync("/api/Users/"+id);
            var result = response.Content;
            // Assert
            Assert.IsType<User>(result);
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
        public async Task UpdateUserUnauthorized()
        {
            int id = 1;
            var _username = "test";
            var _password = "password";
            var content = new StringContent($"username={_username}&password={_password}",
                Encoding.UTF8,
                "application/json");
            User user = new User { };
            // Act
            var response = await _client.PutAsync("/api/Users/current"+id, content);
            // Assert
            Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
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
            {};
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
    }
}
