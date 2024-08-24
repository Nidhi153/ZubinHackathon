
using Zubin.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using System.Text.Json;
using System.Text.Json.Serialization;
using PythonAi;
using Nextjs;


namespace Zubin.Platform.ApiApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddHttpClient<PythonAiApiClient>(client =>
            {
                string uri = "https://localhost:7120/";
                string uri2 = "";
                client.BaseAddress = new Uri(uri);
            });

            builder.Services.AddHttpClient<NextjsClient>(client =>
            {
                string uri = "https://localhost:7120/";
                string uri2 = "";
                client.BaseAddress = new Uri(uri);
            });


            // Add services to the container.
            builder.Services.AddControllers(options =>
            {
                options.Conventions.Add(new RouteTokenTransformerConvention(new SlugifyParameterTransformer()));
            })
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.KebabCaseLower));
                    options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.KebabCaseLower;
                    options.JsonSerializerOptions.AllowTrailingCommas = true;
                })
                ;
            builder.Services.ConfigureHttpJsonOptions(options =>
            {
                options.SerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.KebabCaseLower));
                options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.KebabCaseLower;
                options.SerializerOptions.AllowTrailingCommas = true;
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();
            //app.UsePathBase("/api");
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
