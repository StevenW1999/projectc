﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ProjectC.Models
{
    public class RefreshToken
    {
        [JsonPropertyName("refreshToken")]
        public string RToken { get; set; }
    }
}
