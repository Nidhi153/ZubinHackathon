using Microsoft.AspNetCore.Mvc;
using MockServer.AiFastApi.Models;
using Swashbuckle.AspNetCore.Annotations;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;

namespace MockServer.AiFastApi.Controllers
{
    [ApiController]
    [Route("/ai")]
    public partial class PythonAiApiController : ControllerBase
    {

        public PythonAiApiController()
        {
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
        public virtual IActionResult GetRecommendation([FromBody] GetRecommendationRequest body)
        {
            var response = new GetRecommendationResponse() 
            { 
                Events=new List<ResponseEvent>()
                { 
                    new()
                    {
                        Eventid="1", 
                        Similarity=0.3m
                    } 
                }
            };

            return Ok(response);
        }

        [HttpPost]
        [Route("whatsapp/broadcast")]
        [SwaggerOperation("sendBroadcast")]
        [SwaggerResponse(statusCode: 200, type: typeof(SendBroadcastResponse), description: "Success")]
        public virtual IActionResult SendBroadcast([FromBody] SendBroadcastRequest body)
        {
            var response = new SendBroadcastResponse()
            {
                Result="Success", 
                Status="200"
            };

            return Ok(response);
        }

        [HttpPost]
        [Route("chatbot")]
        [SwaggerOperation("sendToChatbot")]
        [SwaggerResponse(statusCode: 200, type: typeof(SendToChatbotResponse), description: "Success")]
        public virtual IActionResult SendToChatbot([FromBody] SendToChatbotRequest body)
        {
            var response = new SendToChatbotRequest()
            {
                Input = "input from community members"
            };
            return Ok(response);
        }

        [HttpPost]
        [Route("whatsapp/images")]
        [SwaggerOperation("sendImages")]
        [SwaggerResponse(statusCode: 200, type: typeof(SendImagesResponse), description: "Success")]
        public virtual  IActionResult SendImages([FromBody] SendImagesRequest body)
        {
            var response = new SendImagesResponse()
            {
                Result="Success",
                Status="200"
            };
            return Ok(response);
        }

    }
}
