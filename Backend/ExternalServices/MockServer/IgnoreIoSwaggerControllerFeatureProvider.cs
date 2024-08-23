using Microsoft.AspNetCore.Mvc.Controllers;
using System.Reflection;

namespace ExternalServicesDoc
{
    public class IgnoreIoSwaggerControllerFeatureProvider : ControllerFeatureProvider
    {
        protected override bool IsController(TypeInfo typeInfo)
        {
            return base.IsController(typeInfo) && !typeInfo.FullName.StartsWith("IO.Swagger") && !typeInfo.FullName.Contains("SwaggerEditor");
        }
    }
}