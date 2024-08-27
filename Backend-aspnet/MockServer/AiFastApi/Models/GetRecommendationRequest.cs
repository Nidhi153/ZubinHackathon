namespace MockServer.AiFastApi.Models
{

    public class GetRecommendationRequest
    {
        public List<string> Skills { get; set; }
        public List<RequestEvent> Events { get; set; }
    }

}
