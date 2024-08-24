using Swashbuckle.AspNetCore.SwaggerGen;
using System.Xml.Linq;
using System.Xml.XPath;
namespace MockServer;

/// <summary>
/// Adds documentation that is provided by the <inhertidoc /> tag.
/// </summary>
/// <seealso cref="ISchemaFilter" />
public static class SwaggerGenXmlDocsHelper
{
    public static void AddXmlDocsWithInheritdoc(this SwaggerGenOptions options)
    {
        // generate paths for the XML doc files in the assembly's directory.
        var XmlDocPaths = Directory.GetFiles(
          path: AppDomain.CurrentDomain.BaseDirectory,
          searchPattern: "*.xml"
        );

        // load the XML docs for processing.
        var XmlDocs = (
          from DocPath in XmlDocPaths select XDocument.Load(DocPath)
        ).ToList();

        // need a map for looking up member elements by name.
        var TargetMemberElements = new Dictionary<string, XElement>();

        // add member elements across all XML docs to the look-up table. We want <member> elements
        // that have a 'name' attribute but don't contain an <inheritdoc> child element.
        foreach (var doc in XmlDocs)
        {
            var members = doc.XPathSelectElements("/doc/members/member[@name and not(inheritdoc)]");

            foreach (var m in members) TargetMemberElements.Add(m.Attribute("name")!.Value, m);
        }

        // for each <member> element that has an <inheritdoc> child element which references another
        // <member> element, replace the <inheritdoc> element with the nodes of the referenced <member>
        // element (effectively this 'dereferences the pointer' which is something Swagger doesn't support).
        foreach (var doc in XmlDocs)
        {
            var PointerMembers = doc.XPathSelectElements("/doc/members/member[inheritdoc[@cref]]");

            foreach (var PointerMember in PointerMembers)
            {
                var PointerElement = PointerMember.Element("inheritdoc");
                var TargetMemberName = PointerElement!.Attribute("cref")!.Value;

                if (TargetMemberElements.TryGetValue(TargetMemberName, out var TargetMember))
                    PointerElement.ReplaceWith(TargetMember.Nodes());
            }
        }

        // replace all <see> elements with the unqualified member name that they point to (Swagger uses the
        // fully qualified name which makes no sense because the relevant classes and namespaces are not useful
        // when calling an API over HTTP).
        foreach (var doc in XmlDocs)
        {
            foreach (var SeeElement in doc.XPathSelectElements("//see[@cref]"))
            {
                var TargetMemberName = SeeElement.Attribute("cref")!.Value;
                var ShortMemberName = TargetMemberName.Substring(TargetMemberName.LastIndexOf('.') + 1);

                if (TargetMemberName.StartsWith("M:")) ShortMemberName += "()";

                SeeElement.ReplaceWith(ShortMemberName);
            }
        }

        // add pre-processed XML docs to Swagger.
        foreach (var doc in XmlDocs)
            options.IncludeXmlComments(() => new XPathDocument(doc.CreateReader()), true);
    }

}