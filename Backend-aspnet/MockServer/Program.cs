
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.OpenApi.Models;
using System.ComponentModel.DataAnnotations;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using MockServer.ExternalServicesDoc;
using Microsoft.Extensions.Options;

namespace MockServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services
             .AddControllers(options =>
             {
                 options.Filters.Add(new ProducesAttribute("application/json"));
             })
             .AddNewtonsoftJson(options =>
             {
                 options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
             })
             .ConfigureApplicationPartManager(manager =>
             {
                 var t = manager.FeatureProviders;
                 manager.FeatureProviders.Clear();
                 manager.FeatureProviders.Add(new IgnoreIoSwaggerControllerFeatureProvider());
             });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            var controllerGroups = Assembly
            .GetAssembly(typeof(Program))
            .GetTypes()
            .Where(type => typeof(ControllerBase).IsAssignableFrom(type))
            .Select(x => new
            {
                x.GetCustomAttribute<ApiExplorerSettingsAttribute>()?.GroupName,
                Title = x.GetCustomAttribute<DisplayAttribute>()?.Name,
                Description = x.GetCustomAttribute<DisplayAttribute>()?.Name,
                Type = x
            })
            .DistinctBy(x => x.GroupName)
            .Where(x => !string.IsNullOrEmpty(x.GroupName))
            .ToList();

            builder.Services.AddSwaggerGenNewtonsoftSupport();
            builder.Services.AddSwaggerGen(options =>
            {
                options.EnableAnnotations();
                options.DocInclusionPredicate((s, x) => s == x.GroupName);
                options.OperationFilter<SwaggerOperationFilter>();
                options.DocumentFilter<SwaggerDocumentFilter>();
                options.SchemaFilter<SwaggerSchemaFilter>();
                options.ResolveConflictingActions(apiDescriptions =>
                apiDescriptions.First(x => !x.ActionDescriptor.DisplayName.Contains("IO.Swagger.Controllers")));
                foreach (var controllerGroup in controllerGroups)
                {
                    options.SwaggerDoc(controllerGroup.GroupName, new OpenApiInfo
                    {
                        Title = controllerGroup.Title,
                        Description = controllerGroup.Description,
                        Version = "1",
                        TermsOfService = new Uri("http://swagger.io/terms/")
                    });
                }
                //options.AddXmlDocsWithInheritdoc();
                var xmlDocs = Directory.GetFiles(AppContext.BaseDirectory, "*.xml");
                foreach (var xmlDoc in xmlDocs)
                {
                    options.IncludeXmlComments(xmlDoc);
                }
                //options.UseAllOfToExtendReferenceSchemas();
                options.EnableAnnotations();
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(options =>
                {
                    options.ConfigObject.AdditionalItems.Add("operationsSorter", "alpha");
                    foreach (var controllerGroup in controllerGroups)
                    {
                        options.SwaggerEndpoint($"{controllerGroup.GroupName}/swagger.json", controllerGroup.GroupName);
                    }
                });
            }

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
