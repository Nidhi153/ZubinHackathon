
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PythonAi;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using SSendMessageRequest = PythonAi.Models.SendMessageRequest;
using SSendMessageResponse = PythonAi.Models.SendMessageResponse;
using PythonAi.Models;

namespace PythonAi.Services
{
    public class PythonAiService
    {
        private readonly ILogger<PythonAiService> _logger;
        private readonly PythonAiApiClient _pythonAiApiClient;
        //private readonly ConcurrentDictionary<string, string> accessTokens = new();
        public PythonAiService(
            PythonAiApiClient pythonAiApiClient,
                ILogger<PythonAiService> logger)
        {
            _logger = logger;
            _pythonAiApiClient = pythonAiApiClient;
        }
      
        //public async Task<SSendMessageResponse> SendMessageAsync(string userId, string message)
        //{
        //    var request = new SendMessageRequest()
        //    {
        //        UserId = userId,
        //        Message = message,
        //    };
            
        //    var response = await _pythonAiApiClient.SendMessageAsync(request);

        //    return new SSendMessageResponse()
        //    {
        //        Message = response.Message,
        //    };
        //}


    }



}