using Microsoft.AspNetCore.SignalR;
using Project.Models;
using Project.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Hubs
{
    public class ChatHub : Hub
    {
        private readonly IChatService _chatService;
        private readonly IMessageService _messageService;
        public int UsersOnline;

        public ChatHub(IChatService chatService, IMessageService messageService)
        {
            _chatService = chatService;
            _messageService = messageService;
        }

        public async Task SendMessage(Guid roomId, string user, string message)
        {
            ChatMessage m = new ChatMessage()
            {
                RoomId = roomId,
                Contents = message,
                UserName = user
            };

            await _messageService.AddMessageToRoomAsync(roomId, m);
            await Clients.All.SendAsync("ReceiveMessage", user, message, roomId, m.Id, m.PostedAt);
        }

        public async Task AddChatRoom(string roomName)
        {
            ChatRoom chatRoom = new ChatRoom()
            {
                Name = roomName
            };

            await _chatService.AddChatRoomAsync(chatRoom);
            await Clients.All.SendAsync("NewRoom", roomName, chatRoom.Id);
        }

        public override async Task OnConnectedAsync()
        {
            UsersOnline++;
            await Groups.AddToGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            UsersOnline--;
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "SignalR Users");
            await base.OnDisconnectedAsync(exception);
        }
    }
}
