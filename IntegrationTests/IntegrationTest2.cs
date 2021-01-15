using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
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
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;
using XUnitTestProject1;

namespace Project.IntegrationTests
{
    public class IntegrationTest2 : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;

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
        public async Task GetUsersUnauthenticated()
        {
            // Act
            var response = await _client.GetAsync("/api/Users");
            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
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
