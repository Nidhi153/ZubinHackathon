﻿namespace MockServer.NextjsApi.Models
{
    public class InsertQuestionRequest
    {
        public string Phonenumber { get; set; }
        public string Message { get; set; }
        public List<string> Categories { get; set; }
    }
}
