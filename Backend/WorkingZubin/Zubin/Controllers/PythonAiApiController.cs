using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;
using Zubin.Api.Python;

namespace Zubin.Controllers
{
    [ApiController]
    [Route("/ai")]
    public class PythonAiApiController : ControllerBase
    {
        private readonly PythonAiApiClient _pythonAiApiClient;

        public PythonAiApiController(PythonAiApiClient pythonAiApiClient)
        {
            _pythonAiApiClient = pythonAiApiClient;
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
        public virtual async Task<IActionResult> GetRecommendation([FromBody] GetRecommendationRequest body)
        {
            var response = await _pythonAiApiClient.GetRecommendationAsync(body);

            return Ok(response);
        }

        [HttpPost]
        [Route("whatsapp/broadcast")]
        [SwaggerOperation("sendBroadcast")]
        [SwaggerResponse(statusCode: 200, type: typeof(SendBroadcastResponse), description: "Success")]
        public virtual async Task<IActionResult> SendBroadcast([FromBody] SendBroadcastRequest body)
        {
            var response = await _pythonAiApiClient.SendBroadcastAsync(body);

            return Ok(response);
        }

        [HttpPost]
        [Route("chatbot")]
        [SwaggerOperation("sendToChatbot")]
        [SwaggerResponse(statusCode: 200, type: typeof(SendToChatbotResponse), description: "Success")]
        public virtual IActionResult SendToChatbot([FromBody] SendToChatbotRequest body)
        {
            return new ObjectResult(new SendToChatbotResponse()
            {
                Title = "testing",
                Text = "I testing"
            });
        }

        [HttpPost]
        [Route("whatsapp/images")]
        [SwaggerOperation("sendImages")]
        [SwaggerResponse(statusCode: 200, type: typeof(SendImagesResponse), description: "Success")]
        public virtual IActionResult SendImages([FromBody] SendImagesRequest body)
        {
            return new ObjectResult(new SendImagesResponse()
            {
                Result = "suc",
                Status = "200"
            });
        }

    }
}
