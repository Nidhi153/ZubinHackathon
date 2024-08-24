using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace EventReminder
{
    [DataContract]
    public class SendBroadcastRequest
    {
        [DataMember]
        public List<string> Phonenumbers { get; set; }
        [DataMember]
        public string Broadcastmessage { get; set; }
    }
}
