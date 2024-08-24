using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zubin.Platform.WebApi.Ai.Models
{
    public class WhatsappResponse
    {
        public string ResponseId { get; set; }
        public string Message { get; set; }
        public string Contact { get; set; }
        public string UserId { get; set; }
        public List<string> Tags{ get; set; }
    }
}
