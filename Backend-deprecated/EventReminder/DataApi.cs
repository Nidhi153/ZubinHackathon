using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml.XPath;

namespace EventReminder
{
    public class DataApi
    {

        public async Task<SendBroadcastResponse> BroadcastAsync(List<string> Phonenumbers, string Broadcastmessage)
        {
            var request = new SendBroadcastRequest()
            {
                Phonenumbers = Phonenumbers,
                Broadcastmessage = Broadcastmessage
            };
            string serialized = JsonSerializer.Serialize(request);

            HttpClient client = new HttpClient();

            var content = new StringContent(serialized, Encoding.UTF8, "application/json");

            try
            {
                var response = await client.PostAsync("http://localhost:5128/ai/whatsapp/broadcast", content);
                var responseBody = response.Content.ReadAsStringAsync().Result;

                return JsonSerializer.Deserialize<SendBroadcastResponse>(responseBody);
            }
            catch (HttpRequestException e)
            {
                Console.WriteLine($"Error sending POST request: {e.Message}");
            }

            return null;
        }

     

        public async Task<GetNextDayEventsResponse> ReadAsync()
        {
            var result = new GetNextDayEventsResponse();

            HttpClient client = new HttpClient();
            var responseBody = await client.GetStringAsync("http://localhost:5128/zubin-frontend/nextdayevents/");

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            };

            result = JsonSerializer.Deserialize<GetNextDayEventsResponse>(responseBody, options);

            if (result.Events.Count > 0)
            {
                return result;
            }

            return null;
        }
    }
}
