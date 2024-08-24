using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace EventReminder
{

    public class SendBroadcastResponse
    {
        public string Status { get; set; } = "200";
        public string Result { get; set; } = "Success";
    }
}
