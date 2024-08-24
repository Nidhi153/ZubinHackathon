using System.Runtime.Serialization;

namespace Zubin.Platform.WebApi2.PythonAiApi.Models
{
    [DataContract]
    public class SendToChatbotRequest
    {
        [DataMember]
        public string Input { get; set; }
    }
}
