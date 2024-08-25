﻿using Microsoft.AspNetCore.Mvc;
using Zubin.Platform.WebApi2.Nextjs.Models;
using 

namespace Zubin.Platform.WebApi2.Nextjs.Controllers
{
    [ApiController]
    [Route("/zubin-frontend")]
    public class NextjsApiController : ControllerBase
    {
        public NextjsApiController() { }
        [HttpGet]
        [Route("nextdayevents/")]
        public GetNextDayEventsResponse GetNextDayEvents()
        {
            return new()
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