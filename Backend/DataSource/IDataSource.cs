using System.Net;
using System.Net.Http.Json;
using System;


namespace DataSource
{
    public interface IDataSource
    {

        //User has his own responsibility to handle exceptions from IDataSource
        //List<MathExpression> Read();

        Task<List<EventData>> ReadAsync();
        //void Insert(MathExpression expression);
        Task InsertEventAsync(EventData expression);

        //void Drop();

        Task DropAsync();
    }
}
