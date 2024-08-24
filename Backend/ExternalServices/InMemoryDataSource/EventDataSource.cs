using InMemoryDataSource.Models;
using System.Collections.Concurrent;

namespace InMemoryDataSource
{
    public class EventDataSource
    {
        public ConcurrentBag<Event> Events { get; set; } = new ConcurrentBag<Event>();
    }
}
