using Microsoft.AspNetCore.Mvc;
using MockServer.SwaggerEditor.Nextjs.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace MockServer.SwaggerEditor.Nextjs.Controllers
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
            GetNextDayEventsResponse response =  new ()
            {
                Events = new()
                {
                    {new Event(){ Phonenumbers=new(){"+85212345678"}, Description="event 1 " } },
                    {new Event(){ Phonenumbers=new(){"+85287654321"}, Description = "event 2" } },
                }
            };
            return new ObjectResult(response);
        }

        [HttpPost]
        [Route("whatsapp/question")]
        [SwaggerOperation("InserQuestion")]
        [SwaggerResponse(statusCode: 200, type: typeof(InserQuestionResponse), description: "Success")]
        public virtual IActionResult InsertQuestion(InsertQuestionRequest body)
        {
            var request = body;
            return new ObjectResult("hi");
        }
    }
}
