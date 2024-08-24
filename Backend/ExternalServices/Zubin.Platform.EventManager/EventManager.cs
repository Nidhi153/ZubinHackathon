using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using InMemoryDataSource;
using Microsoft.Extensions.Logging;

namespace Zubin.Platform.EventManager
{
    public class EventManager
    {
        private readonly ILogger _logger;
        EventDataSource _dataSource;
        public EventManager(ILogger<EventManager> logger, EventDataSource dataSource)
        {
            _logger = logger;
            _dataSource = dataSource;
        }

        public async Task<Eve>
       
    }
}
