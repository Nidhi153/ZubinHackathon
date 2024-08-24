using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;


namespace DataSource
{
    public class NewCalculatorResult
    {
        [Key]
        public int? MathExpressionID { get; set; }
        [Precision(28, 16)]
        public decimal LeftOperand { get; set; }
        public string Operator { get; set; }
        [Precision(28, 16)]
        public decimal? RightOperand { get; set; }
        [Precision(28, 16)]
        public decimal? Result { get; set; }
        public DateTime? DateTimeAdded { get; set; }
    }
}
