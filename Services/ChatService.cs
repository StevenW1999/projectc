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
            chatRoom.Id = Guid.NewGuid();

            _context.ChatRooms.Add(chatRoom);

            var saveResults = await _context.SaveChangesAsync();

            return saveResults > 0;
        }
    }
}
