using Microsoft.Extensions.Configuration;
using System.Collections.Specialized;
using System.Dynamic;
using Zubin.ConsoleApp;

namespace Zubin.ConsoleApp
{
    public class AppOptions
    {
        public string Allowed => Logging.LogLevel["Default"];
        string AllowedHost { get; set; }
        string AllowedHosts { get; set; }
        LoggingOptions Logging { get; set; }
        class LoggingOptions
        {
            public NameValueCollection LogLevel { get; set; }
        }
    }
    public static class ConfigurationExtensions
    {
        public static T GetValue<T>(this IConfiguration configuration, string[] keys, T defaultValue)
        {
            foreach (var key in keys)
            {
                T value = configuration.GetValue<T>(key);
                if (!EqualityComparer<T>.Default.Equals(value, default))
                {
                    return value;
                }
            }
            return defaultValue;
        }
    }
}