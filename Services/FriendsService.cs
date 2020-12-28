using Microsoft.Extensions.Logging;
using Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Services
{
    public interface IFriendsService
    {
        bool IsExistingFriendship(int UserId1, int UserId2);
        List<User> NotConfirmedFriends(int Id);
        List<User> ConfirmedFriends(int Id);
        FriendRequest SpecificRequest(int CurrUserId, int FriendId);
    }

    public class FriendService : IFriendsService
    {
        private readonly ILogger<FriendService> _logger;
        private readonly ProjectCContext _context;

        public FriendService(ILogger<FriendService> logger, ProjectCContext context)
        {
            _logger = logger;
            _context = context;
        }

        public bool IsExistingFriendship(int UserId1, int UserId2)
        {
            var Friendship = _context.FriendRequests.FirstOrDefault(f => (f.Friend1Id.Equals(UserId1) && f.Friend2Id.Equals(UserId2)) || (f.Friend1Id.Equals(UserId2) && f.Friend2Id.Equals(UserId1)));
            if (Friendship != null)
            {
                return true;
            }
            return false;
        }

        public List<User> NotConfirmedFriends(int Id)
        {
            List<User> Friends = new List<User>();
            var Requests = _context.FriendRequests.Where(r => (r.Friend1Id == Id || r.Friend2Id == Id) && r.IsConfirmed == false).ToList();
            foreach(var item in Requests)
            {
                //add users that are not the current user
                User Friend = null;
                if(item.Friend1Id == Id)
                {
                    Friend = _context.Users.FirstOrDefault(f => f.Id == item.Friend2Id);
                    Friends.Add(Friend);
                }
                if (item.Friend2Id == Id)
                {
                    Friend = _context.Users.FirstOrDefault(f => f.Id == item.Friend1Id);
                    Friends.Add(Friend);
                }
            }
            return Friends;
        }

        public List<User> ConfirmedFriends(int Id)
        {
            List<User> Friends = new List<User>();
            var Requests = _context.FriendRequests.Where(r => (r.Friend1Id == Id || r.Friend2Id == Id) && r.IsConfirmed == true).ToList();
            foreach (var item in Requests)
            {
                //add users that are not the current user
                User Friend = null;
                if (item.Friend1Id == Id)
                {
                    Friend = _context.Users.FirstOrDefault(f => f.Id == item.Friend2Id);
                    Friends.Add(Friend);
                }
                if (item.Friend2Id == Id)
                {
                    Friend = _context.Users.FirstOrDefault(f => f.Id == item.Friend1Id);
                    Friends.Add(Friend);
                }
            }
            return Friends;
        }
        public FriendRequest SpecificRequest(int CurrUserId, int FriendId)
        {
            var Friendship = _context.FriendRequests.FirstOrDefault(f => (f.Friend1Id.Equals(CurrUserId) && f.Friend2Id.Equals(FriendId)) || (f.Friend1Id.Equals(FriendId) && f.Friend2Id.Equals(CurrUserId)));
            return Friendship;
        }
    }
}
