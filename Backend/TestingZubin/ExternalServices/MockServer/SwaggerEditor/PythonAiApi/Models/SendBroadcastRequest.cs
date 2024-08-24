using System.Runtime.Serialization;

namespace MockServer.SwaggerEditor.PythonAiApi.Models
{
    [DataContract]
    public class SendBroadcastRequest
    {
        [DataMember]
        public List<string> phonenumbers { get; set; }
        [DataMember]
        public string Broadcastmessage { get; set; }
    }
}
