using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zubin.Platform.WebApi
{
    public class Registration
    {
        public string RegistrationId { get; set; }
        public string UserId { get; set; }
        public string EventId { get; set; }
        public string Role { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
    }


}
