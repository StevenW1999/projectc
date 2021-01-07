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
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Collections.Concurrent;

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
            var _context = MockContext.GetContext(nameof(GetAllUsersAsync));
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
        [InlineData(10)]
        public async Task GetNonExistingUser(int id)
        {
            // Arrange
            var dbContext = MockContext.GetContext(nameof(GetNonExistingUser));
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
            var dbContext = MockContext.GetContext(nameof(GetAllUsersAsync));
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
            var dbContext = MockContext.GetContext(nameof(GetAllUsersAsync));
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

            Assert.Equal("Admin", response);
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
            var dbContext = MockContext.GetContext(nameof(GetAllUsersAsync));

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
            var emptyList = new List<User>();
            var dbContext = MockContext.GetContext(nameof(GetNotConfirmedFriendsWithNotExistingUser));
            dbContext.Seed();
            var friendService = new FriendService(null, dbContext);

            var response = friendService.NotConfirmedFriends(Id);

            dbContext.Dispose();
            Assert.Equal(emptyList,response);
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
            var emptyList = new List<User>();

            dbContext.Dispose();
            Assert.Equal(emptyList,response);
        }

        [Theory]
        [InlineData(1,2)]
        [InlineData(1,3)]
        public async Task GetSpecificRequest(int Id1, int Id2)
        {
            var dbContext = MockContext.GetContext(nameof(GetConfirmedFriends));
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
            var friendService = new FriendService(null, dbContext);

            var response = friendService.SpecificRequest(Id1, Id2);

            dbContext.Dispose();
            Assert.Null(response);
        }

        [Fact]
        public async Task NewAuthToken()
        {
            var username = "test1";
            var claims = new[]
        {
                new Claim("username",username),
                new Claim("role", "user")
            };
            var tokenConfig = new JwTokenConfig 
            { 
                Secret = "1234567890123456789",
                Issuer = "testServer",
                Audience = "everyone",
                AccessTokenExpiration = 10,
                RefreshTokenExpiration = 10

            };
            var dbContext = MockContext.GetContext(nameof(NewAuthToken));
            dbContext.Seed();
            var service = new JwtAuthManager(tokenConfig);

            var result = service.GenerateTokens(username, claims, DateTime.Now);

            Assert.IsType<JwtAuthResult>(result);
        }


        [Fact]
        public async Task RemoveExpiredTokens()
        {
            var username = "test1";
            var claims = new[]
            {
                new Claim("username",username),
                new Claim("role", "user")
            };
            var _usersRefreshTokens = new ConcurrentDictionary<string, Project.Auth.RefreshToken>();
       
            var tokenConfig = new JwTokenConfig
            {
                Secret = "1234567890123456789",
                Issuer = "testServer",
                Audience = "everyone",
                AccessTokenExpiration = 10,
                RefreshTokenExpiration = 10

            };

            var dbContext = MockContext.GetContext(nameof(RemoveExpiredTokens));
            dbContext.Seed();
            var service = new JwtAuthManager(tokenConfig);
            var result = service.GenerateTokens(username, claims, new DateTime(1979, 07, 28, 22, 35, 5));

            service.RemoveExpiredRefreshTokens(DateTime.Now);
            var count = _usersRefreshTokens.Count();
            Assert.Equal(0,count);
        }

        [Fact]
        public async Task RemoveUserTokens()
        {
            var username = "test1";
            var claims = new[]
            {
                new Claim("username",username),
                new Claim("role", "user")
            };
            var _usersRefreshTokens = new ConcurrentDictionary<string, Project.Auth.RefreshToken>();

            var tokenConfig = new JwTokenConfig
            {
                Secret = "1234567890123456789",
                Issuer = "testServer",
                Audience = "everyone",
                AccessTokenExpiration = 10,
                RefreshTokenExpiration = 10

            };

            var dbContext = MockContext.GetContext(nameof(RemoveUserTokens));
            dbContext.Seed();
            var service = new JwtAuthManager(tokenConfig);
            var result = service.GenerateTokens(username, claims, new DateTime(1979, 07, 28, 22, 35, 5));

            service.RemoveRefreshTokenByUserName(username);
            var count = _usersRefreshTokens.Count();
            Assert.Equal(0, count);
        }


        [Fact]
        public async Task RemoveNonExistingUserTokens()
        {
            var tokens = new List<Project.Auth.RefreshToken>();

            tokens.Add(new Project.Auth.RefreshToken
            {
                UserName = "test",
                TokenString = "tokenstring",
                ExpireAt = DateTime.Now
            });
            tokens.Add(new Project.Auth.RefreshToken
            {
                UserName = "test",
                TokenString = "tokenstring",
                ExpireAt = DateTime.Now
            });

            var tokenConfig = new JwTokenConfig
            {
                Secret = "test",
                Issuer = "testServer",
                Audience = "everyone",
                AccessTokenExpiration = 10,
                RefreshTokenExpiration = 10

            };
            var dbContext = MockContext.GetContext(nameof(RemoveNonExistingUserTokens));
            dbContext.Seed();
            var service = new JwtAuthManager(tokenConfig);

            service.RemoveRefreshTokenByUserName("fake user");
            var count = tokens.Count();
            Assert.True(count == 2);
        }

        //[Fact]
        //public async Task RefreshExistingToken()
        //{
        //    var tokens = new List<Project.Auth.RefreshToken>();

        //    tokens.Add(new Project.Auth.RefreshToken
        //    {
        //        UserName = "test",
        //        TokenString = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE2MTAwMjExNDcsImlzcyI6Imh0dHBzOi8vd3d3LnByb2plY3QyMDIwMTIxMjE2MzM0OC5henVyZXdlYnNpdGVzLm5ldC8iLCJhdWQiOiJodHRwczovL3d3dy5wcm9qZWN0MjAyMDEyMTIxNjMzNDguYXp1cmV3ZWJzaXRlcy5uZXQvIn0.-8ySBLUeah4hMeAp0eGqm_XtH99kgv6gDwfh4L_QQZA",
        //        ExpireAt = DateTime.Now
        //    });
        //    tokens.Add(new Project.Auth.RefreshToken
        //    {
        //        UserName = "test",
        //        TokenString = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE2MTAwMjExNDcsImlzcyI6Imh0dHBzOi8vd3d3LnByb2plY3QyMDIwMTIxMjE2MzM0OC5henVyZXdlYnNpdGVzLm5ldC8iLCJhdWQiOiJodHRwczovL3d3dy5wcm9qZWN0MjAyMDEyMTIxNjMzNDguYXp1cmV3ZWJzaXRlcy5uZXQvIn0.-8ySBLUeah4hMeAp0eGqm_XtH99kgv6gDwfh4L_QQZA",
        //        ExpireAt = DateTime.Now
        //    });
        //    var token = tokens.First().TokenString;

        //    var tokenConfig = new JwTokenConfig
        //    {
        //        Secret = "1234567890123456789",
        //        Issuer = "testServer",
        //        Audience = "everyone",
        //        AccessTokenExpiration = 10,
        //        RefreshTokenExpiration = 10

        //    };
        //    var dbContext = MockContext.GetContext(nameof(RefreshExistingToken));
        //    dbContext.Seed();
        //    var service = new JwtAuthManager(tokenConfig);

        //    var response = service.Refresh("test", token, DateTime.Now);
        //    var count = tokens.Count();
        //    Assert.True(count == 2);
        //    Assert.IsType<JwtAuthResult>(response);
        //}

        //[Theory]
        //[InlineData("fake user", "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE2MTAwMjExNDcsImlzcyI6Imh0dHBzOi8vd3d3LnByb2plY3QyMDIwMTIxMjE2MzM0OC5henVyZXdlYnNpdGVzLm5ldC8iLCJhdWQiOiJodHRwczovL3d3dy5wcm9qZWN0MjAyMDEyMTIxNjMzNDguYXp1cmV3ZWJzaXRlcy5uZXQvIn0.-8ySBLUeah4hMeAp0eGqm_XtH99kgv6gDwfh4L_QQBB")]
        //[InlineData("", "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE2MTAwMjExNDcsImlzcyI6Imh0dHBzOi8vd3d3LnByb2plY3QyMDIwMTIxMjE2MzM0OC5henVyZXdlYnNpdGVzLm5ldC8iLCJhdWQiOiJodHRwczovL3d3dy5wcm9qZWN0MjAyMDEyMTIxNjMzNDguYXp1cmV3ZWJzaXRlcy5uZXQvIn0.-8ySBLUeah4hMeAp0eGqm_XtH99kgv6gDwfh4L_QQCC")]
        //public async Task RefreshNonExistingToken(string username, string token)
        //{
        //    var tokens = new List<Project.Auth.RefreshToken>();

        //    tokens.Add(new Project.Auth.RefreshToken
        //    {
        //        UserName = "test",
        //        TokenString = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE2MTAwMjExNDcsImlzcyI6Imh0dHBzOi8vd3d3LnByb2plY3QyMDIwMTIxMjE2MzM0OC5henVyZXdlYnNpdGVzLm5ldC8iLCJhdWQiOiJodHRwczovL3d3dy5wcm9qZWN0MjAyMDEyMTIxNjMzNDguYXp1cmV3ZWJzaXRlcy5uZXQvIn0.-8ySBLUeah4hMeAp0eGqm_XtH99kgv6gDwfh4L_QQZA",
        //        ExpireAt = DateTime.Now
        //    });
        //    tokens.Add(new Project.Auth.RefreshToken
        //    {
        //        UserName = "test",
        //        TokenString = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE2MTAwMjExNDcsImlzcyI6Imh0dHBzOi8vd3d3LnByb2plY3QyMDIwMTIxMjE2MzM0OC5henVyZXdlYnNpdGVzLm5ldC8iLCJhdWQiOiJodHRwczovL3d3dy5wcm9qZWN0MjAyMDEyMTIxNjMzNDguYXp1cmV3ZWJzaXRlcy5uZXQvIn0.-8ySBLUeah4hMeAp0eGqm_XtH99kgv6gDwfh4L_QQAA",
        //        ExpireAt = DateTime.Now
        //    });

        //    var tokenConfig = new JwTokenConfig
        //    {
        //        Secret = "1234567890123456789",
        //        Issuer = "testServer",
        //        Audience = "everyone",
        //        AccessTokenExpiration = 10,
        //        RefreshTokenExpiration = 10

        //    };
        //    var dbContext = MockContext.GetContext(nameof(GetAllUsersAsync));
        //    var service = new JwtAuthManager(tokenConfig);

        //    var response = service.Refresh(username, token, DateTime.Now);
        //    var count = tokens.Count();

        //    Assert.True(count == 2);
        //    Assert.IsType<SecurityTokenException>(response);
        //}

        [Fact]
        public async Task DecodeValidToken()
        {
            var error = false;
            var token = "valid token";
            var tokenConfig = new JwTokenConfig
            {
                Secret = "test",
                Issuer = "testServer",
                Audience = "everyone",
                AccessTokenExpiration = 10,
                RefreshTokenExpiration = 10

            };
            var dbContext = MockContext.GetContext(nameof(DecodeValidToken));
            dbContext.Seed();
            var service = new JwtAuthManager(tokenConfig);

            try
            {
                var response = service.DecodeJwtToken(token);
            }
            catch (ArgumentException)
            {
                error = false;
            }
            Assert.False(error);
        }

        [Fact]
        public async Task DecodeInvalidToken()
        {
            var error = false;
            var token = "";
            var tokenConfig = new JwTokenConfig
            {
                Secret = "test",
                Issuer = "testServer",
                Audience = "everyone",
                AccessTokenExpiration = 10,
                RefreshTokenExpiration = 10

            };
            var dbContext = MockContext.GetContext(nameof(DecodeInvalidToken));
            dbContext.Seed();
            var service = new JwtAuthManager(tokenConfig);
            try
            {
                var response = service.DecodeJwtToken(token);
            }
            catch(SecurityTokenException)
            {
                error = true;
            }
            Assert.True(error);
        }
    }
}
