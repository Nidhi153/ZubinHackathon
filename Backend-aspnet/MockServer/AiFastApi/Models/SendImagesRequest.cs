namespace MockServer.AiFastApi.Models
{

    public class SendImagesRequest
    {
        public List<string> Phonenumbers { get; set; }
        public string Caption { get; set; }
        public string Imageid { get; set; }
    }


}
