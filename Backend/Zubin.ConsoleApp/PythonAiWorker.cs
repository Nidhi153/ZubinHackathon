using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Schema;
using PythonAi.Services;

namespace Zubin.ConsoleApp
{
    public class PythonAiWorker : IHostedService
    {
        private PythonAiService _pythonAiService;
        private ILogger _logger;

        public PythonAiWorker(PythonAiService pythonAiService, ILogger<PythonAiWorker> logger)
        {
            _pythonAiService = pythonAiService;
            _logger = logger;
        }
        public async Task StartAsync(CancellationToken cancellationToken)
        {
            var response = await _pythonAiService.SendMessageAsync("user_id_kohei", "I wanna ask about that");
            _logger.LogInformation(JsonConvert.SerializeObject(response));
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation($"Stop");
            return Task.CompletedTask;
        }
    }
}
