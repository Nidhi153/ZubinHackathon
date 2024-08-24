using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Zubin.Api;
using Zubin.Api.Nextjs;
using Zubin.Api.Python;
using Zubin.Models.Nextjs;
using Zubin.Models.PythonAi;

namespace Zubin.Controllers
{
    [ApiController]
    [Route("/zubin-frontend")]
    public class NextjsApiController : ControllerBase
    {
        private readonly NextjsClient _nextjsClient;
        public NextjsApiController(NextjsClient nextjsClient) 
        {
            _nextjsClient = nextjsClient;
        }
        //[HttpGet]
        //[Route("nextdayevents/")]
        //[SwaggerOperation("GetNextDayEvents")]
        //[SwaggerResponse(statusCode: 200, type: typeof(object), description: "Success")]
        //public async virtual Task<IActionResult> GetNextDayEventsAsync()
        //{
        //    var response = await _nextjsClient.GetNextDayEventsAsync();

        //    var events = response.Events.Select(g => new Models.Nextjs.Event()
        //    {
        //        Phonenumbers = g.Phonenumbers.ToList(),
        //        Description = g.Description,
        //    }).ToList();

        //    var result = new Models.Nextjs.GetNextDayEventsResponse()
        //    {
        //        Events = events
        //    };

        //    return new ObjectResult(result);

        //}

        [HttpPost]
        [Route("whatsapp/question")]
        public async Task<InserQuestionResponse> InsertQuestion(InsertQuestionRequest body)
        {
            var request = new Api.Nextjs.InsertQuestionRequest()
            {
                Phonenumber = body.Phonenumber,
                Message = body.Message,
                Categories = body.Categories.ToList()
            };

            var response = await _nextjsClient.InserQuestionAsync(request);

            return new InserQuestionResponse()
            {
                Info = response.Info,
            };
        }

        [HttpGet]
        [Route("nextdayevents/")]
        public async Task<object> GetNextDayEventsAsync()
        {
            var response = await _nextjsClient.GetNextDayEventsAsync();

            var events = response.Events.Select(g => new Event()
            {
                Phonenumbers = g.Phonenumbers.ToList(),
                Description = g.Description,
            }).ToList();

            var result = new GetNextDayEventsResponse()
            {
                Events = events
            };

            return new ObjectResult(result );
        }

        public class GetNextDayEventsResponse
        {
            //public List<Event> Events = new List<Event>();
            //public string Name { get; set; }
            public List<Event> Events { get; set; }
        }
        public class Event
        {
            public List<string> Phonenumbers { get; set; }
            public string Description { get; set; }
        }

        public class InsertQuestionRequest
        {
            public string Phonenumber { get; set; }
            public string Message { get; set; }
            public List<string> Categories { get; set; }
        }

        public class InserQuestionResponse
        {
            public string Info { get; set; }
        }

    }
}
