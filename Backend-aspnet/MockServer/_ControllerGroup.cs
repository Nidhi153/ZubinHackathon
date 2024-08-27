using Microsoft.AspNetCore.Mvc;
using MockServer.AiFastApi.Controllers;
using MockServer.NextjsApi.Controllers;
using System.ComponentModel.DataAnnotations;

namespace MockServer
{
    [Display(Name = "Python FastAPI", Description = "")]
    [ApiExplorerSettings(GroupName = "Python FastAPI")]
    public class PythonAiController : PythonAiApiController {}

    [Display(Name = "Nextjs API", Description = "")]
    [ApiExplorerSettings(GroupName = "Nextjs API")]

    public class NextjsController : NextjsApiController { }
}
