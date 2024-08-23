using Hko.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Hko.Services
{
    public class WeatherService
    {
        private readonly HkoApiClient _client;
        public WeatherService(HkoApiClient client)
        {
            _client = client;
        }

        public async Task<LocalWeatherForecast> GetLocalWeatherForecastAsync(string lang)
        {
            var data = await _client.GetWeatherResponseAsync("flw", lang);
            LocalWeatherForecast localWeather = new LocalWeatherForecast();
            localWeather.FireDangerWarning = data.FireDangerWarning;
            localWeather.ForecastPeriod = data.ForecastPeriod;
            localWeather.ForecastDesc = data.ForecastDesc;
            localWeather.TcInfo = data.TcInfo;
            localWeather.GeneralSituation = data.GeneralSituation;
            localWeather.Outlook = data.Outlook;
            if(data.UpdateTime is DateTimeOffset dateTime) 
                localWeather.UpdateTime = dateTime;
            return localWeather;
        }

        public async Task<NineDayWeatherForecast> GetNineDayWeatherForecastAsync(string lang)
        {
            var data = await _client.GetWeatherResponseAsync("fnd", lang);

            NineDayWeatherForecast nineDay = new NineDayWeatherForecast();
            nineDay.GeneralSituation = data.GeneralSituation;
            nineDay.SeaTemp = data.SeaTemp;
            nineDay.SoilTemp = data.SoilTemp?.ToList();
            if(data.UpdateTime is DateTimeOffset dateTime)
            {
                nineDay.UpdateTime = dateTime;
            }
            
            nineDay.WeatherForecast = data.WeatherForecast?.ToList();
            return nineDay;
        }

        public async Task<CurrentWeatherReport> GetCurrentWeatherReportAsync(string lang)
        {
            var data = await _client.GetWeatherResponseAsync("rhrread", lang);
            CurrentWeatherReport currentWeather = new CurrentWeatherReport();
            currentWeather.Humidity =  data.Humidity;
            currentWeather.Temperature = data.Temperature;
            currentWeather.Icon = data.Icon?.ToList();
            if(data.IconUpdateTime is DateTimeOffset dateTime)
            {
                currentWeather.IconUpDateTimeOffset = dateTime;
            }
            
            currentWeather.Lightning = data.Lightning;
            currentWeather.MintempFrom00To09 = data.MintempFrom00To09;
            currentWeather.Rainfall = data.Rainfall;
            currentWeather.RainfallFrom00To12 = data.RainfallFrom00To12;
            currentWeather.RainfallJanuaryToLastMonth = data.RainfallJanuaryToLastMonth;
            currentWeather.Uvindex = data.Uvindex;
            if(data.UpdateTime is DateTimeOffset dateTime2)
            {
                currentWeather.UpDateTimeOffset = dateTime2;
            }
            
            currentWeather.RainfallLastMonth = data.RainfallLastMonth;
            currentWeather.RainstormReminder = data.RainstormReminder;
            currentWeather.Tcmessage = data.Tcmessage?.ToList();
            currentWeather.WarningMessage = data.WarningMessage?.ToList();
            return currentWeather;
        }

        public async Task<WeatherWarningSummaryList> GetWeatherWarningSummaryAsync(string lang)
        {
            var data = await _client.GetWeatherResponseAsync("warnsum", lang);
            WeatherWarningSummaryList warningSum = new WeatherWarningSummaryList();
            warningSum.Wcold = data.Wcold;
            warningSum.Wfire =data.Wfire;
            warningSum.Wfntsa =data.Wfntsa;
            warningSum.Wfrost =data.Wfrost;
            warningSum.Whot =data.Whot;
            warningSum.Wl =data.Wl;
            warningSum.Wmsgnl =data.Wmsgnl;
            warningSum.Wrain =data.Wrain;
            warningSum.Wtcsgnl =data.Wtcsgnl;
            warningSum.Wtmw =data.Wtmw;
            warningSum.Wts =   data.Wts;

            return warningSum;
        }

        public async Task<WeatherWarningInformationList> GetWeatherWarningInformationAsync(string lang)
        {
            var data = await _client.GetWeatherResponseAsync("warninginfo", lang);
            WeatherWarningInformationList warningInfo = new WeatherWarningInformationList();
            warningInfo.Details = data.Details?.ToList();
            return warningInfo;
        }

        public async Task<SpecialWeatherTipList> GetSpecialWeatherTipsAsync(string lang)
        {
            var data = await _client.GetWeatherResponseAsync("swt", lang);
            SpecialWeatherTipList weatherTips = new SpecialWeatherTipList();
            weatherTips.Swt = data.Swt?.ToList();
            return weatherTips;
        }

    }
}
