using CsvHelper.Configuration;
using CsvHelper;
using System.Globalization;

namespace DataSource
{
    public class CsvSource : IDataSource
    {
        //private CsvConfiguration csvIOConfiguration;
        //private string filePath;
        private CsvConfiguration csvIOConfiguration = new CsvConfiguration(CultureInfo.InvariantCulture) { HasHeaderRecord = false };
        private string filePath = "path\\to\\new3.csv";

        public CsvSource() { }
        public CsvSource(CsvConfiguration csvIOConfiguration, string filePath)
        {
            this.csvIOConfiguration = csvIOConfiguration;
            this.filePath = filePath;
        }

        public List<EventData> Read()
        {
            List<EventData> list = new List<EventData>();
            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, csvIOConfiguration))
            {
                var records = csv.GetRecords<EventData>();
                foreach (var record in records)
                {
                    list.Add(record);
                }
            }

            return list;
        }



        public void Insert(EventData expression)
        {
            List<EventData> records = new List<EventData>();
            records.Add(expression);

            using (var stream = File.Open(filePath, FileMode.Append))
            using (var writer = new StreamWriter(stream))
            using (var csv = new CsvWriter(writer, csvIOConfiguration))
            {
                csv.WriteRecords(records);
            }
        }

        public async Task InsertEventAsync(EventData expression)
        {
            List<EventData> records = new List<EventData>();
            records.Add(expression);

            using (var stream = File.Open(filePath, FileMode.Append))
            using (var writer = new StreamWriter(stream))
            using (var csv = new CsvWriter(writer, csvIOConfiguration))
            {
                await csv.WriteRecordsAsync(records);
            }
        }

        public void Drop()
        {
            List<EventData> emptyRecords = new List<EventData>();
            using (var writer = new StreamWriter(filePath))
            using (var csv = new CsvWriter(writer, csvIOConfiguration))
            {
                csv.WriteRecords(emptyRecords);
            }
        }

        public async Task<List<EventData>> ReadAsync()
        {
            List<EventData> list = new List<EventData>();
            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, csvIOConfiguration))
            {
                var records = csv.GetRecordsAsync<EventData>();
                // I don't know why 
                await foreach (var record in records)
                {
                    list.Add(record);
                }
            }

            return list;
        }

        public async Task DropAsync()
        {
            List<EventData> emptyRecords = new List<EventData>();
            using (var writer = new StreamWriter(filePath))
            using (var csv = new CsvWriter(writer, csvIOConfiguration))
            {
                await csv.WriteRecordsAsync(emptyRecords);
            }
        }
    }
}
