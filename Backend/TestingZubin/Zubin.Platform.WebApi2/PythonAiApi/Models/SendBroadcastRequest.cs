using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Collections.Generic;

namespace Zubin.Platform.WebApi2.PythonAiApi.Models
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
