using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zubin.Platform.WebApi
{
    public class Waitlist
    {
        public string UserId { get; set; }
        public string EventId { get; set; }
        public DateTimeOffset SignedUpAt { get; set; }
    }
}
