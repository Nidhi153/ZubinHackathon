namespace EventReminder
{
    internal class Program
    {
        const int dayInMillisecond = 24 * 60 * 60 * 1000;

        static void Main(string[] args)
        {
            DataApi api = new DataApi();
            Console.WriteLine("Hello, World!");

            //var response = api.ReadAsync().Result;

            //Console.WriteLine(response);

            //foreach(var nextEvent in response.Events)
            //{
            //    var response2 = api.BroadcastAsync(nextEvent.Phonenumbers, $"Remind of the event: {nextEvent.Description}").Result;
            //    Console.WriteLine(response2);
            //}

            //Console.WriteLine (response);

            while(true)
            {
                Console.WriteLine("Sending reminder");

                var response = api.ReadAsync().Result;

                Console.WriteLine(response);

                foreach (var nextEvent in response.Events)
                {
                    var response2 = api.BroadcastAsync(nextEvent.Phonenumbers, $"Remind of the event: {nextEvent.Description}").Result;
                    Console.WriteLine(response2);
                }


                Task.Delay(dayInMillisecond).Wait();
            }
        }

    }
}
