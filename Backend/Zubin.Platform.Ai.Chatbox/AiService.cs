using PythonAi.Models;
using PythonAi.Services;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using System.ComponentModel;
using System.Net;
using System.Reflection.Metadata.Ecma335;
using System.Text.RegularExpressions;

namespace Zubin.Platform.Ai.PythonAi
{
    public class AiService : IAiService
    {
        private readonly ILogger<AiService> _logger;
        private readonly PythonAiService _pythonAiservice;

        public AiService(PythonAiService pythonAiservice, ILogger<AiService> logger)
        {
            _logger = logger;
            _pythonAiservice = pythonAiservice;
        }
        public async Task<Models.SendMessageResponse> SendMessageToChatbox(string userId, string message)
        {
            var response = await _pythonAiservice.SendMessageAsync(userId, message);
            return new Models.SendMessageResponse()
            {
                Message = response.Message,
            };
        }
    }

}
