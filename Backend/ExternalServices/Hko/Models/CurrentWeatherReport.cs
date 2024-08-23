using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hko.Models
{
    public class CurrentWeatherReport
    {
        public WeatherResponseLightning Lightning { get; set; }
        public WeatherResponseRainfall Rainfall { get; set; }
        public List<string> WarningMessage { get; set; }
        public string RainstormReminder { get; set; }
        public List<int> Icon { get; set; }
        public DateTimeOffset IconUpDateTimeOffset { get; set; }

        public WeatherResponseUvindex Uvindex { get; set; }
        public DateTimeOffset UpDateTimeOffset { get; set; }
        public WeatherResponseTemperature Temperature { get; set; }
        public List<string> Tcmessage { get; set; }
        public string MintempFrom00To09 { get; set; }

        public string RainfallFrom00To12 { get; set; }
        public string RainfallLastMonth { get; set; }
        public string RainfallJanuaryToLastMonth { get; set; }

        public WeatherResponseHumidity Humidity { get; set; }
    }

    //public class LightningDataList : AllOfWeatherResponseLightning { }

    //public class RainfallDataList : AllOfWeatherResponseRainfall { }
    //public class UvDataList : AllOfWeatherResponseUvindex { }
    //public class TemperatureDataList : AllOfWeatherResponseTemperature { }
    //public class HumidityDataList : AllOfWeatherResponseHumidity { }
}
