using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hko.Models
{
    public class WeatherWarningSummaryList
    {
        public WeatherResponseWfrost Wfrost { get; set; }
        public WeatherResponseWhot Whot { get; set; }
        public WeatherResponseWcold Wcold { get; set; }
        public WeatherResponseWfntsa Wfntsa { get; set; }
        public WeatherResponseWmsgnl Wmsgnl { get; set; }
        public WeatherResponseWl Wl { get; set; }
        public WeatherResponseWrain Wrain { get; set; }
        public WeatherResponseWtmw Wtmw { get; set; }
        public WeatherResponseWts Wts { get; set; }
        public WeatherResponseWtcsgnl Wtcsgnl { get; set; }
        public WeatherResponseWfire Wfire { get; set; }
    }

    //swagger 
    //public class WFrost : AllOfWeatherResponseWfrost { }
    //public class WHot : AllOfWeatherResponseWhot { }
    //public class WCold : AllOfWeatherResponseWcold { }
    //public class WFntsa : AllOfWeatherResponseWfntsa { }
    //public class WMsgnl : AllOfWeatherResponseWmsgnl { }
    //public class WL : AllOfWeatherResponseWl { }
    //public class WRain : AllOfWeatherResponseWrain { }
    //public class WTmw : AllOfWeatherResponseWtmw { }
    //public class WTs : AllOfWeatherResponseWts { }
    //public class WTcsgnl : AllOfWeatherResponseWtcsgnl { }
    //public class WFire : AllOfWeatherResponseWfire { }
}
