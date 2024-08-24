using CsvHelper.Configuration.Attributes;

namespace DataSource
{
    public class EventData
    {
        //public int HistoryCount { get { return histoutcunt; } , set{histoutcunt=value}}

        [Index(0)]
        public decimal? Left { get; set; } = null;
        [Index(1)]
        public string Operation { get; set; } = null;
        [Index(2)]
        public decimal? Right { get; set; } = null;
        [Index(3)]
        public decimal? Result { get; set; } = null;
        public EventData() { }

        //public EventData GetCopy()
        //{
        //    return new EventData()
        //    {
        //        Left = Left,
        //        Operation = Operation,
        //        Right = Right,
        //        Result = Result
        //    };
        //}

    }


}