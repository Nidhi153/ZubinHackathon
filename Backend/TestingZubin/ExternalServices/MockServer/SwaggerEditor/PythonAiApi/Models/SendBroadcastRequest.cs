﻿using System.Runtime.Serialization;

namespace MockServer.SwaggerEditor.PythonAiApi.Models
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