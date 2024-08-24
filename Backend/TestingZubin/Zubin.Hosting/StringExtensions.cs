#if NETSTANDARD2_0
using System;

namespace HSITP.Hosting;
public static class StringExtensions
{
    public static bool Contains(this string source, string value, StringComparison comparisonType) =>
        source.IndexOf(value, comparisonType) >= 0;
    public static bool EndsWith(this string source, string value, StringComparison comparisonType) =>
        source.IndexOf(value, comparisonType) == source.Length - value.Length;
}
#endif
