using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zubin.Platform.WebApi
{
    public class Event
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Venue { get; set; }
        public User Creator { get; set; }
        public DateTimeOffset Date { get; set; }
        public int quota { get; set; }
        public string StartDatetime { get; set; }
        public string EndDatetime { get; set; }
        public List<Skills> RequiredSkills { get; set; }
        public string CreatedAt { get; set; }
        public string UpdatedAt { get; set; }
    }
}
