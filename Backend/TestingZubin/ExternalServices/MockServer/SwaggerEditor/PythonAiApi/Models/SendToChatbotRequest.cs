using System.Runtime.Serialization;

namespace MockServer.SwaggerEditor.PythonAiApi.Models
{
    [DataContract]
    public class SendToChatbotRequest
    {
        [DataMember]
        public string Input { get; set; }
    }
}
