using Microsoft.EntityFrameworkCore;

namespace DataSource
{
    public class SqlEfSource : IDataSource
    {
        class NewCalculatorResultContext : DbContext
        {
            public DbSet<NewCalculatorResult> NewCalculatorResults { get; set; }

            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
                optionsBuilder.UseSqlServer(
                    @"Server=192.168.4.70;Database=kohei_db; User Id=kohei;Password=kohei;TrustServerCertificate=True");
            }
        }

        public List<EventData> Read()
        {
            List<EventData> list = new List<EventData>();
            using (var db = new NewCalculatorResultContext())
            {
                var list2 = db.NewCalculatorResults
                    .ToList();

                foreach (var item in list2)
                {
                    list.Add(new EventData
                    {
                        Left = item.LeftOperand,
                        Right = item.RightOperand,
                        Result = item.Result,
                        Operation = item.Operator,
                    });
                }

            }
            return list;
        }

        public void Insert(EventData currentExpression)
        {
            using (var db = new NewCalculatorResultContext())
            {
                var newRes = new NewCalculatorResult
                {
                    LeftOperand = currentExpression.Left.Value,
                    Operator = currentExpression.Operation,
                    RightOperand = currentExpression.Right,
                    Result = currentExpression.Result,
                    DateTimeAdded = DateTime.Now,
                };

                //db.NewCalculatorResults.Add(newRes);
                db.NewCalculatorResults.Add(newRes);
                db.SaveChanges();
            }
        }

        public void Drop()
        {
            using (var db = new NewCalculatorResultContext())
            {
                db.NewCalculatorResults.ExecuteDelete();
            }
        }

        //public async Task<List<EventData>> ReadAsync()
        //{
        //    List<EventData> list = new List<EventData>();
        //    using (var db = new NewCalculatorResultContext())
        //    {
        //        var list2 = await db.NewCalculatorResults
        //            .Select()
        //            .ToListAsync();

        //        foreach (var item in list2)
        //        {
        //            list.Add(new EventData
        //            {
        //                Left = item.LeftOperand,
        //                Right = item.RightOperand,
        //                Result = item.Result,
        //                Operation = item.Operator,
        //            });
        //        }

        //    }
        //    return list;
        //}

        public async Task InsertEventAsync(EventData currentExpression)
        {
            using (var db = new NewCalculatorResultContext())
            {
                var newRes = new NewCalculatorResult
                {
                    LeftOperand = currentExpression.Left.Value,
                    Operator = currentExpression.Operation,
                    RightOperand = currentExpression.Right,
                    Result = currentExpression.Result,
                    DateTimeAdded = DateTime.Now,
                };

                //db.NewCalculatorResults.Add(newRes);
                await db.NewCalculatorResults.AddAsync(newRes);
                await db.SaveChangesAsync();
            }
        }

        public async Task DropAsync()
        {
            using (var db = new NewCalculatorResultContext())
            {
                await db.NewCalculatorResults.ExecuteDeleteAsync();
            }
        }
    }
}
