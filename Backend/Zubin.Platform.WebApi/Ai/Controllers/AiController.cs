﻿using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;
using System.Text.Json;
using Zubin.Platform.Ai;
using Zubin.Platform.Ai.Models;
using Zubin.Platform.WebApi.Ai.Models;
//using Microsoft.AspNetCore.Http.HttpContext;

namespace Zubin.Platform.WebApi.Ai.Controllers;

[ApiController]
[Route("[controller]")]
[AllowAnonymous]

public partial class AiController : ControllerBase
{
    private readonly ILogger<AiController> _logger;
    private readonly AiManager _aiManager;
    public AiController(
        ILogger<AiController> logger
        , AiManager manager
        )
    {
        _logger = logger;
        _aiManager = manager;
    }

    [HttpPost]
    [Route("[action]/{placeholder}")]
    [SwaggerOperation("SendMessage")]
    [Produces("application/json")]
    public async virtual Task<IActionResult> ChatboxMessage(string placeholder, [FromBody] SendMessageRequest body)
    {
        var response = await _aiManager.SendMessageAsyc(body.UserId, body.Message);
        return new ObjectResult(response);
    }
}