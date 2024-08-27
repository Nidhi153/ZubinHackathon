using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace MockServer.ExternalServicesDoc;

public class SwaggerOperationFilter : IOperationFilter
{
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
        operation.OperationId = operation.OperationId ?? operation.Summary;
        if (context.MethodInfo.Name == "paymentMethod")
        {

        }
    }
}