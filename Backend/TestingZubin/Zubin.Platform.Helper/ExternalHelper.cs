using Nextjs;
using PythonAi;
using System.Collections.Generic;
using CEvent = Zubin.Platform.WebApi2.Nextjs.Models.Event;
using CGetNextDayEventsResponse = Zubin.Platform.WebApi2.Nextjs.Models.GetNextDayEventsResponse;
using CInserQuestionResponse = Zubin.Platform.WebApi2.Nextjs.Models.InserQuestionResponse;
using CInserQuestionRequest = Zubin.Platform.WebApi2.Nextjs.Models.InsertQuestionRequest;
using CGetRecommendationResponse=  Zubin.Platform.WebApi2.PythonAiApi.Models.GetRecommendationResponse;
using CGetRecommendationRequest = Zubin.Platform.WebApi2.PythonAiApi.Models.GetRecommendationRequest;
using CSendBroadcatResponse = Zubin.Platform.WebApi2.PythonAiApi.Models.SendBroadcastResponse;
using CSendBroadcastRequest =  Zubin.Platform.WebApi2.PythonAiApi.Models.SendBroadcastRequest;
using CSendToChatbotResponse = Zubin.Platform.WebApi2.PythonAiApi.Models.SendToChatbotResponse;
using CSendToChatbotRequest  = Zubin.Platform.WebApi2.PythonAiApi.Models.SendToChatbotRequest;

namespace Zubin.Platform.Helper
{
    public class ExternalHelper
    {
        private readonly Nextjs.NextjsClient _nextjsApi;
        private readonly PythonAiApiClient _aiClient;
        public ExternalHelper(NextjsClient nextjsApi, PythonAiApiClient aiClient)
        {
            _nextjsApi = nextjsApi;
            _aiClient = aiClient;
        }
        public async Task<CGetNextDayEventsResponse> GetNextDayEventsAsync()
        {
            var response = await _nextjsApi.GetNextDayEventsAsync();
            var result = new WebApi2.Nextjs.Models.GetNextDayEventsResponse()
            {
                Events = response.Events.Select(g => new CEvent()
                {
                    Phonenumbers = g.Phonenumbers.ToList()
                    ,
                    Description = g.Description
                })
                .ToList()
            };

            return result;
        }

        public async Task<CInserQuestionResponse> InsertQuestionAsync(CInserQuestionRequest body)
        {
            var request = new Nextjs.InsertQuestionRequest()
            {
                Phonenumber = body.Phonenumber,
                Message = body.Message,
                Categories = body.Categories.ToList()
            };
            var response = await _nextjsApi.InserQuestionAsync(request);

            return new CInserQuestionResponse()
            {
                Info = response.Info,
            };
        }

        public async Task<CGetRecommendationResponse> GetRecommendationAsync(CGetRecommendationRequest body)
        {
            var request = new PythonAi.GetRecommendationRequest()
            {
                Skills = body.Skills.ToList(),
                Events = body.Events.Select(thisEvent => new PythonAi.Event()
                {
                    Eventid = thisEvent.Eventid,
                    Skills = thisEvent.Skills.ToList()
                }).ToList()
            };
            var response = await _aiClient.GetRecommendationAsync(request);
            var result = new CGetRecommendationResponse()
            {
                Events = response.Events.Select(thisEvent => new WebApi2.PythonAiApi.Models.Event()
                {
                    Eventid = thisEvent.Eventid,
                    Skills = thisEvent.Skills.ToList()
                }).ToList()
            };

            return result;
        }

        public async Task<CSendBroadcatResponse> SendBroadcastAsync(CSendBroadcastRequest body)
        {
            var request = new PythonAi.SendBroadcastRequest()
            {
                Phonenumbers = body.Phonenumbers.ToList(),
                Broadcastmessage = body.Broadcastmessage,
            };
            var response = await _aiClient.SendBroadcastAsync(request);

            var result = new CSendBroadcatResponse()
            {
                Status = response.Status,
                Result = response.Result
            };

            return result;
        }

        public async Task<CSendToChatbotResponse> SendToChatbotAsync(CSendToChatbotRequest body)
        {
            var request = new PythonAi.SendToChatbotRequest
            {
                Input = body.Input,
            };

            var response = await _aiClient.SendToChatbotAsync(request);

            var result = new CSendToChatbotResponse()
            {
                Title = response.Title,
                Text = response.Text,
            };

            return result;
        }
    }
}
