using System.Data.SqlClient;
using System.Data;
using System.Xml.XPath;

namespace DataSource
{
    public class SqlSource : IDataSource
    {
        private string SqlDataSource = Environment.GetEnvironmentVariable("SQLDATASOURCE") ?? "";
        private string SqlInitialCatalog = Environment.GetEnvironmentVariable("SQLINITIALCATALOG") ?? "";
        private string SqlUserId = Environment.GetEnvironmentVariable("SQLUSERID") ?? "";
        private string SqlPassword = Environment.GetEnvironmentVariable("SQLPASSWORD") ?? "";
        private string SqlTable = Environment.GetEnvironmentVariable("SQLTABLE") ?? "";
        private string connectionString;
        public SqlSource() { connectionString = $"Data Source={SqlDataSource}; Initial Catalog={SqlInitialCatalog}; User id={SqlUserId};Password={SqlPassword};"; }

        public List<EventData> Read()
        {
            List<EventData> list = new List<EventData>();
            string queryString = $"SELECT * FROM {SqlTable} ;";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(queryString, connection);
                connection.Open();
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    IDataRecord dataRecord = reader;
                    EventData someExpression = new EventData();
                    someExpression.Left = dataRecord.GetDecimal(1);
                    someExpression.Operation = dataRecord.IsDBNull(2) ? null : dataRecord[2].ToString();
                    someExpression.Right = dataRecord.IsDBNull(3) ? null : dataRecord.GetDecimal(3);
                    someExpression.Result = dataRecord.IsDBNull(4) ? null : dataRecord.GetDecimal(4);
                    list.Add(someExpression);
                }
            }


            return list;
        }



        public void Insert(EventData mathExpression)
        {
            string leftString = mathExpression.Left == null ? "null" : mathExpression.Left?.ToString();
            string rightString = mathExpression.Right == null ? "null" : mathExpression.Right?.ToString();
            string operation = mathExpression.Operation == null ? "null" : $"'{mathExpression.Operation}'";
            string resultString = mathExpression.Result == null ? "null" : mathExpression.Result?.ToString();
            string dateTimeAdded = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            string queryString = $"insert into {SqlTable} ( LeftOperand, Operator, RightOperand, Result, DateTimeAdded) " +
                $"values ({leftString},{operation},{rightString},{resultString}, '{dateTimeAdded}');";


            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(queryString, connection);
                connection.Open();
                cmd.ExecuteNonQuery();
            }

        }



        public void Drop()
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand($"truncate table {SqlTable}", connection);
                connection.Open();
                int numberOfRowsAffected = cmd.ExecuteNonQuery();

            }
        }

        public async Task<List<EventData>> ReadAsync()
        {
            List<EventData> list = new List<EventData>();
            string queryString = $"SELECT * FROM {SqlTable} ;";
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(queryString, connection);
                await connection.OpenAsync();
                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    IDataRecord dataRecord = reader;
                    EventData someExpression = new EventData();
                    someExpression.Left = dataRecord.GetDecimal(1);
                    someExpression.Operation = dataRecord.IsDBNull(2) ? null : dataRecord[2].ToString();
                    someExpression.Right = dataRecord.IsDBNull(3) ? null : dataRecord.GetDecimal(3);
                    someExpression.Result = dataRecord.IsDBNull(4) ? null : dataRecord.GetDecimal(4);
                    list.Add(someExpression);
                }
            }


            return list;
        }

        public async Task InsertEventAsync(EventData mathExpression)
        {
            string leftString = mathExpression.Left == null ? "null" : mathExpression.Left?.ToString();
            string rightString = mathExpression.Right == null ? "null" : mathExpression.Right?.ToString();
            string operation = mathExpression.Operation == null ? "null" : $"'{mathExpression.Operation}'";
            string resultString = mathExpression.Result == null ? "null" : mathExpression.Result?.ToString();
            string dateTimeAdded = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            string queryString = $"insert into {SqlTable} ( LeftOperand, Operator, RightOperand, Result, DateTimeAdded) " +
                $"values ({leftString},{operation},{rightString},{resultString}, '{dateTimeAdded}');";


            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand(queryString, connection);
                await connection.OpenAsync();
                await cmd.ExecuteNonQueryAsync();
            }
        }

        public async Task DropAsync()
        {
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                SqlCommand cmd = new SqlCommand($"truncate table {SqlTable}", connection);
                await connection.OpenAsync();
                int numberOfRowsAffected = await cmd.ExecuteNonQueryAsync();

            }
        }
    }
}
