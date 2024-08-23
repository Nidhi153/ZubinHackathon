#pragma warning disable 1591 // Disable "CS1591 Missing XML comment for publicly visible type or member ..."
using Microsoft.AspNetCore.Mvc;
using MockServer.SwaggerEditor.PythonAi.Models;
using MockServer.SwaggerEditor.PythonAi.ModelsForTesting;
using MockServer.SwaggerEditor.PythonApi.Controllers;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Metrics;
using System.Xml.Serialization;
namespace MockServer.Controllers;

#pragma warning restore 1591

[Display(Name = "PythonAi API", Description = "")]
[ApiExplorerSettings(GroupName = "PythonAi")]
public class PythonAiController : PythonAiApiController
{
    public override IActionResult SendMessage([FromBody] SendMessageRequest body)
            => new ObjectResult(TemporaryClassForTesting.SendMessage(body));
}
