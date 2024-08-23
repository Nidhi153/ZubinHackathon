using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hko.Models
{

    public class LocalWeatherForecast
    {
        public string GeneralSituation { get; set; }
        public string TcInfo { get; set; }
        public string FireDangerWarning { get; set; }
        public string ForecastPeriod { get; set; }
        public string ForecastDesc { get; set; }
        public string Outlook { get; set; }
        public DateTimeOffset UpdateTime { get; set; }
    }


}
