using Microsoft.Extensions.Configuration.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Reflection;
using System.Runtime.InteropServices;
using NLog;
using System.Text.Json;

namespace HSITP.Hosting;

public static class LoggerExtension
{
    static IList<string> sensitiveDataKeys = new List<string> {
        "password",
        "ConnectionStrings",
    };
    public static bool IsSensitiveData(string key) =>
        sensitiveDataKeys.Any(x => key.Contains(x, StringComparison.OrdinalIgnoreCase)
        || key.EndsWith("key", StringComparison.OrdinalIgnoreCase));
    public static string PrintKeyValue(object key, object value)
    {
        var keyString = key?.ToString();
        var valueLength = value?.ToString()?.Length ?? 0;
        var printValue = "";
        if (valueLength > 0)
            printValue = IsSensitiveData(keyString) ? $"[masked length = {valueLength}]" : value.ToString();
        return $"{keyString}={printValue}";
    }
    public static Logger LogFileTargetsPath(this Logger logger)
    {
        var fileTargets = logger.Factory.Configuration.AllTargets.OfType<NLog.Targets.FileTarget>();
        logger.Info($"Log file target(s) [{fileTargets.Count()}]");
        foreach (var fileTarget in fileTargets)
        {
            var fileName = fileTarget.FileName.Render(LogEventInfo.CreateNullEvent());
            logger.Info($"Log file path [{fileName}]");
        }
        return logger;
    }
    public static void LogEnvironmentInformation(this ILogger logger, IHostEnvironment environment)
    {
        logger.Info($"Framework Description [{RuntimeInformation.FrameworkDescription}]");
        logger.Info($"OS Description [{RuntimeInformation.OSDescription}]");
        logger.Info($"OS Architecture [{RuntimeInformation.OSArchitecture}]");
        logger.Info($"Process Architecture [{RuntimeInformation.ProcessArchitecture}]");
        logger.Info($"Assembly [{Assembly.GetEntryAssembly().GetName().FullName}]");
        logger.Info($"ApplicationName [{environment.ApplicationName}]");
        logger.Info($"EnvironmentName [{environment.EnvironmentName}]");
        logger.Info($"ContentRootPath [{environment.ContentRootPath}]");
        logger.Info($"IsDevelopment [{environment.IsDevelopment()}]");
        logger.Info($"IsStaging [{environment.IsStaging()}]");
        logger.Info($"IsProduction [{environment.IsProduction()}]");
        var commandLineArgsDetails = string.Join(" ", Environment.GetCommandLineArgs());
        logger.Info($"Command Line Args [{commandLineArgsDetails}]");
        var environmentVariables = Environment.GetEnvironmentVariables()
            .Cast<DictionaryEntry>()
            .Select(x => PrintKeyValue(x.Key, x.Value))
            .ToList();
        var environmentVariablesDetails = string.Join(Environment.NewLine, environmentVariables);
        logger.Info("Environment Variables" + Environment.NewLine +
            environmentVariablesDetails);
    }
    public static void LogConfig(this ILogger logger, IConfiguration configuration)
    {
        if (configuration is IConfigurationRoot configurationRoot)
        {
            var providers = configurationRoot.Providers;
            var jsonProviders = providers.OfType<JsonConfigurationProvider>();
            if (jsonProviders.Count() > 0)
            {
                logger.Info("Json config" + Environment.NewLine +
                    jsonProviders.Select(x => x.Source.Path));
            }
        }
        var configDetail = configuration.AsEnumerable()
            .Select(x => PrintKeyValue(x.Key, x.Value))
            .ToList();
        logger.Info("Configuration" + Environment.NewLine +
            JsonSerializer.Serialize(configDetail, new JsonSerializerOptions { WriteIndented = true }));
    }
}
