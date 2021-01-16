using Microsoft.EntityFrameworkCore;
using Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Services
{
    public interface IChatService
    {
        Task<List<ChatRoom>> GetChatRoomsAsync();
        Task<bool> AddChatRoomAsync(ChatRoom newChatRoom);
        public bool DoesChatRoomExist(string name);
    }
    public class ChatService : IChatService
    {
        private readonly ProjectCContext _context;

        public ChatService(ProjectCContext context)
        {
            _context = context;
        }

        public async Task<List<ChatRoom>> GetChatRoomsAsync()
        {
            var chatRooms = await _context.ChatRooms.ToListAsync<ChatRoom>();

            return chatRooms;
        }

        public async Task<bool> AddChatRoomAsync(ChatRoom chatRoom)
        {
            if (!DoesChatRoomExist(chatRoom.Name))
            {
                chatRoom.Id = Guid.NewGuid();

                _context.ChatRooms.Add(chatRoom);

                var saveResults = await _context.SaveChangesAsync();

                return saveResults > 0;
            }
            return false;
        }
        public bool DoesChatRoomExist(string name)
        {
            var chatrooms = _context.ChatRooms.FirstOrDefault(c => c.Name == name);
            if(chatrooms == null)
            {
                return false;
            }
            return true;
        }
    }
}
