﻿using Microsoft.AspNetCore.Mvc.Controllers;
using System.Reflection;

namespace MockServer.ExternalServicesDoc
{
    // Used to avoid multiple route matching between parent and child controllers
    public class IgnoreIoSwaggerControllerFeatureProvider : ControllerFeatureProvider
    {
        protected override bool IsController(TypeInfo typeInfo)
        {
            
            return base.IsController(typeInfo) && !typeInfo.FullName.StartsWith("IO.Swagger") && !typeInfo.FullName.Contains("Controllers");
        }
    }
}