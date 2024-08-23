using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zubin.Platform.WebApi.Ai.Models
{
    public class SendMessageRequest
    {
        public string UserId { get; set; }
        public string Message { get; set; }
    }
}
