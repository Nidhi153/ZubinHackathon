using Microsoft.AspNetCore.Mvc;
using MockServer.SwaggerEditor.Nextjs.Models;

namespace MockServer.SwaggerEditor.Nextjs.Controllers
{
    [ApiController]
    [Route("/zubin-frontend")]
    public class NextjsApiController : ControllerBase
    {
        [HttpGet]
        [Route("nextdayevents/")]
        public GetNextDayEventsResponse GetNextDayEvents()
        {
            return new ()
            {
                Events = new()
                {
                    {new Event(){ Phonenumbers=new(){"+85212345678"}, Description="event 1 " } },
                    {new Event(){ Phonenumbers=new(){"+85287654321"}, Description = "event 2" } },
                }
            };
        }

        [HttpPost]
        [Route("whatsapp/question")]
        public object InsertQuestion(InsertQuestionRequest body)
        {
            var request = body;
            return request;
        }
    }
}
