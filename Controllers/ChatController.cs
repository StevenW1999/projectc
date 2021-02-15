using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Project.Hubs;
using Project.Models;
using Project.Services;

namespace Project.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class ChatRoomController : Controller
    {
        private readonly IChatService _chatService;

        public ChatRoomController(IChatService chatService)
        {
            _chatService = chatService;
        }

        // GET: api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var chatRooms = await _chatService.GetChatRoomsAsync();

            return Ok(chatRooms);
        }

        // POST api/values
        [HttpPost]
        public async void Post([FromBody] ChatRoom chatRoom)
        {
            await _chatService.AddChatRoomAsync(chatRoom);
        }
    }
}