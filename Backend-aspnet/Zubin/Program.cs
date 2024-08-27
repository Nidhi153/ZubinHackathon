
using Zubin.Api;
using Zubin.Api.Nextjs;
using Zubin.Api.Python;

namespace Zubin
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddHttpClient<PythonAiApiClient>(client =>
            {
                string uri = "http://localhost:5037/";
                string uri2 = "";
                client.BaseAddress = new Uri(uri);
            });

            builder.Services.AddHttpClient<NextjsApiClient>(client =>
            {
                string uri = "http://localhost:5037/";
                string uri2 = "";
                client.BaseAddress = new Uri(uri);
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
