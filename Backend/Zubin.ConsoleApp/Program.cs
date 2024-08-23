using Keycloak.AuthServices.Authentication;
using Keycloak.AuthServices.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using PythonAi;
using PythonAi.Services;

namespace Zubin.ConsoleApp
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Hello, World!");
            var builder = Host.CreateDefaultBuilder(args);
#if DEBUG
            builder.UseEnvironment(Environments.Development);
#endif
            builder.ConfigureServices((context, services) =>
            {
                services.AddHttpClient<PythonAiApiClient>(client =>
                {
                    string uri = "https://localhost:7120/";
                    string uri2 = "";
                    client.BaseAddress = new Uri(uri);
                });

                services.Configure<AppOptions>(context.Configuration, c => c.BindNonPublicProperties = true);
                services.AddSingleton<PythonAiService>();
                services.AddHostedService<PythonAiWorker>();

            });

            await builder.RunConsoleAsync();
        }
    }
}
