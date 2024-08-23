using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hko.Models
{
    public class NineDayWeatherForecast
    {
        public string GeneralSituation { get; set; }
        public List<IndividualForecast> WeatherForecast { get; set; }
        public DateTimeOffset UpdateTime { get; set; }
        public WeatherResponseSeaTemp SeaTemp { get; set; }
        public List<TemperaturePlace> SoilTemp { get; set; }
    }

    //public class SeaTemp : AllOfWeatherResponseSeaTemp { }
}
