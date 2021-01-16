using Microsoft.EntityFrameworkCore;
using Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Services
{
    public interface IMessageService
    {
        Task<List<ChatMessage>> GetMessagesAsync();
        Task<List<ChatMessage>> GetMessagesForChatRoomAsync(Guid roomId);
        Task<bool> AddMessageToRoomAsync(Guid roomId, ChatMessage message);
    }
    public class MessageService : IMessageService
    {
        private readonly ProjectCContext _context;

        public MessageService(ProjectCContext context)
        {
            _context = context;
        }

        public async Task<List<ChatMessage>> GetMessagesAsync()
        {
            var messages = await _context.ChatMessages.ToListAsync<ChatMessage>();

            return messages;
        }

        public async Task<List<ChatMessage>> GetMessagesForChatRoomAsync(Guid roomId)
        {
            var messagesForRoom = await _context.ChatMessages
                                      .Where(m => m.RoomId == roomId)
                                               .ToListAsync<ChatMessage>();

            return messagesForRoom;
        }

        public async Task<bool> AddMessageToRoomAsync(Guid roomId, ChatMessage message)
        {
            message.Id = Guid.NewGuid();
            message.RoomId = roomId;
            message.PostedAt = DateTimeOffset.Now;

            _context.ChatMessages.Add(message);

            var saveResults = await _context.SaveChangesAsync();

            return saveResults > 0;
        }
    }
}
