using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System.Data;

namespace MockServer;

public class SwaggerSchemaFilter : ISchemaFilter
{
    private IOptions<MvcNewtonsoftJsonOptions> options;

    public SwaggerSchemaFilter(IOptions<MvcNewtonsoftJsonOptions> options) => this.options = options;
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
        if (schema.Type == "object")
        {
            schema.Nullable = true;
        }
        if (context.Type == typeof(decimal) || context.Type == typeof(decimal?))
        {
            schema.Format = "decimal";
        }
        if (context.Type.IsEnum)
        {
            if (!schema.Enum.OfType<OpenApiString>().Any(x => !int.TryParse(x.Value, out _)))
            {
                schema.Format = "int32";
                schema.Type = "integer";
                schema.Enum = schema.Enum
                    .OfType<OpenApiString>()
                    .Select(x => new OpenApiInteger(int.Parse(x.Value)) as IOpenApiAny)
                    .ToList();
            }
        }
    }
}