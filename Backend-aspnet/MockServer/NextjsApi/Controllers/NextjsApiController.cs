using Microsoft.AspNetCore.Mvc;
using MockServer.NextjsApi.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace MockServer.NextjsApi.Controllers
{
    [ApiController]
    [Route("/zubin-frontend")]
    public class NextjsApiController : ControllerBase
    {

        [HttpGet]
        [Route("nextdayevents/")]
        [SwaggerOperation("GetNextDayEvents")]
        [SwaggerResponse(statusCode: 200, type: typeof(GetNextDayEventsResponse), description: "Success")]
        public virtual IActionResult GetNextDayEvents()
        {
            var response = new GetNextDayEventsResponse()
            {
                Events = new List<Event>()
                {
                    new ()
                    {
                        Description = "Good event",
                        Phonenumbers = new List<string>()
                        {
                            "+85212345678",
                            "+85287654321"
                        }
                    }
                }
            };

            return Ok(response);
        }

     

        [HttpPost]
        [Route("whatsapp/question")]
        [SwaggerOperation("InserQuestion")]
        [SwaggerResponse(statusCode: 200, type: typeof(InserQuestionResponse), description: "Success")]
        public virtual async Task<IActionResult> InsertQuestion(InsertQuestionRequest body)
        {
            var response = new InserQuestionResponse()
            {
                Info = "Good response"
            };
            return Ok(response);
        }
    }
}
