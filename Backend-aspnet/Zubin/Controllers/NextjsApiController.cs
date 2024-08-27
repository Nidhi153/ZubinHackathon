using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Zubin.Api;
using Zubin.Api.Nextjs;
using Zubin.Api.Python;

namespace Zubin.Controllers
{
    [ApiController]
    [Route("/zubin-frontend")]
    public class NextjsApiController : ControllerBase
    {
        NextjsApiClient _apiClient;

        public NextjsApiController(NextjsApiClient apiClient)
        {
            _apiClient = apiClient;
        }

        [HttpGet]
        [Route("nextdayevents/")]
        [SwaggerOperation("GetNextDayEvents")]
        [SwaggerResponse(statusCode: 200, type: typeof(GetNextDayEventsResponse), description: "Success")]
        public virtual async Task<IActionResult> GetNextDayEvents()
        {
            var response = await _apiClient.GetNextDayEventsAsync();

            return Ok(response);
        }

        [HttpPost]
        [Route("whatsapp/question")]
        [SwaggerOperation("InserQuestion")]
        [SwaggerResponse(statusCode: 200, type: typeof(InserQuestionResponse), description: "Success")]
        public virtual async Task<IActionResult> InsertQuestion(InsertQuestionRequest body)
        {
            var response = await _apiClient.InserQuestionAsync(body);
            return Ok(response);
        }
    }
}
