namespace MockServer.SwaggerEditor.PythonAiApi.Models
{
    public class EventResponse
    {
        public string Eventid { get; set; }
        public decimal Similarity { get; set; }
    }

    public class EventRequest
    {
        public string Eventid { get; set; }
        public List<string> Skills { get; set; }
    }
}
