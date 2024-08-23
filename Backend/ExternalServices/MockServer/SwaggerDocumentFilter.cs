using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace MockServer;

public class SwaggerDocumentFilter : IDocumentFilter
{
    public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
    {
        foreach (var schema in context.SchemaRepository.Schemas)
        {
            if (schema.Value.AdditionalProperties == null)
            {
                schema.Value.AdditionalPropertiesAllowed = true;
            }
        }
    }
}