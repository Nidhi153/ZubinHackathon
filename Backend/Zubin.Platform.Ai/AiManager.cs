using System;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Microsoft.Extensions.Logging;
using Zubin.Platform.Ai.Models;

namespace Zubin.Platform.Ai
{
    public class AiManager
    {
        private readonly ILogger<AiManager> _logger;
        private readonly IAiService _aiService;
        public AiManager(ILogger<AiManager> logger, IAiService homeDeviceService)
        {
            _logger = logger;
            _aiService = homeDeviceService;
        }

        public async Task<SendMessageResponse> SendMessageAsyc(string userId, string message)
        {
            _logger.LogInformation("Hello from GetStatusAsync");
            var response = await _aiService.SendMessageToChatbox(userId, message);

            return response;
        }
    }
}
