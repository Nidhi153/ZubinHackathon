using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Zubin.Platform.WebApi
{
    public class CustomEnumConverter<T> : TypeConverter
    {
        public override object ConvertFrom(ITypeDescriptorContext context, CultureInfo culture, object value)
        {
            var s = value as string;
            if (string.IsNullOrEmpty(s))
            {
                return null;
            }
            string camel = Regex.Replace("-" + s, "-.", m => m.Value.ToUpper().Substring(1));
            return Enum.Parse(typeof(T), camel);
        }

    }
}
