﻿using Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Hubs
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
    }
}
