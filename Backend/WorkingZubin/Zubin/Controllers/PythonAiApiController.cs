using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;
using Zubin.Api.Python;
using Zubin.Models.PythonAi;

namespace Zubin.Controllers
{
    [ApiController]
    [Route("/ai")]
    public class PythonAiApiController : ControllerBase
    {

        private readonly PythonAiApiClient _apiClient;

        public PythonAiApiController(PythonAiApiClient apiClient)
        {
            _apiClient = apiClient;
        }
        /// <summary>
        /// ControlDevice
        /// </summary>
        /// <param name="body"></param>
        /// <response code="200">Success</response>
        [HttpPost]
        [Route("recommendation")]

        [SwaggerOperation("GetRecommendation")]
        [SwaggerResponse(statusCode: 200, type: typeof(GetRecommendationResponse), description: "Success")]
        public async virtual Task<IActionResult> GetRecommendationAsync([FromBody] GetRecommendationRequest body)
        {
            var request = new Api.Python.GetRecommendationRequest()
            {
                Skills = body.Skills,
                Events = body.Events.Select(g=> new Api.Python.Event() 
                { Eventid=g.Eventid, Skills=g.Skills})
                .ToList(),
            };
            var response= await _apiClient.GetRecommendationAsync(request);

            GetRecommendationResponse result = new()
            {
                Events = response.Events.Select(g => new Event()
                {
                    Eventid = g.Eventid,
                    Skills = g.Skills.ToList(),
                })
                .ToList()
            };

            return new ObjectResult(result);
        }

        [HttpPost]
        [Route("whatsapp/broadcast")]

        [SwaggerOperation("sendBroadcast")]
        [SwaggerResponse(statusCode: 200, type: typeof(SendBroadcastResponse), description: "Success")]
        public async virtual Task<IActionResult> SendBroadcastAsync([FromBody] SendBroadcastRequest body)
        {
            var request = new Api.Python.SendBroadcastRequest()
            {
                Phonenumbers = body.Phonenumbers,
                Broadcastmessage = body.Broadcastmessage,
            };

            var response = await _apiClient.SendBroadcastAsync(request);

            var result = new SendBroadcastResponse()
            {
                Status = response.Status,
                Result = response.Result,
            };
            return new ObjectResult(result);
        }

        [HttpPost]
        [Route("chatbot")]

        [SwaggerOperation("sendToChatbot")]
        [SwaggerResponse(statusCode: 200, type: typeof(SendToChatbotResponse), description: "Success")]
        public virtual async Task<IActionResult> SendToChatbotAsync([FromBody] SendToChatbotRequest body)
        {
            SendToChatbotResponse result;

            var request = new Api.Python.SendToChatbotRequest()
            {
                Input=body.Input,
            };

            var response = await _apiClient.SendToChatbotAsync(request);

            result = new SendToChatbotResponse()
            {
                Title = response.Title,
                Text = response.Text
            };

            return new ObjectResult(result);
        }

        public class Event
        {
            public string Eventid { get; set; }
            public List<string> Skills { get; set; }
        }

        [DataContract]
        public class GetRecommendationRequest
        {
            [DataMember]
            [Required]
            public List<string> Skills { get; set; }
            [DataMember]
            [Required]
            public List<Event> Events { get; set; }
        }

        public class GetRecommendationResponse
        {
            public List<Event> Events { get; set; }
        }

        [DataContract]
        public class SendBroadcastRequest
        {
            [DataMember]
            public List<string> Phonenumbers { get; set; }
            [DataMember]
            public string Broadcastmessage { get; set; }
        }

        public class SendBroadcastResponse
        {
            public string Status { get; set; } = "200";
            public string Result { get; set; } = "Success";
        }

        [DataContract]
        public class SendToChatbotRequest
        {
            [DataMember]
            public string Input { get; set; }
        }

        public class SendToChatbotResponse
        {
            public string Title { get; set; }
            public string Text { get; set; }
        }
    }
}
