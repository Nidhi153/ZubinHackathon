#pragma warning disable 1591 // Disable "CS1591 Missing XML comment for publicly visible type or member ..."
using Microsoft.AspNetCore.Mvc;
using MockServer.SwaggerEditor.Nextjs.Controllers;
using MockServer.SwaggerEditor.PythonAiApi.Controllers;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Metrics;
using System.Xml.Serialization;
namespace MockServer.Controllers;

#pragma warning restore 1591

[Display(Name = "PythonAi API", Description = "")]
[ApiExplorerSettings(GroupName = "PythonAi")]
public class PythonAiController : PythonAiApiController{}

[Display(Name = "Nextjs API", Description = "")]
[ApiExplorerSettings(GroupName = "Nextjs")]
public class NextjsController: NextjsApiController{}