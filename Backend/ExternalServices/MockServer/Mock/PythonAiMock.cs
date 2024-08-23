using IO.Swagger.Attributes;
using Microsoft.AspNetCore.Mvc;
using MockServer.SwaggerEditor.PythonAi.Models;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Annotations;

namespace MockServer.SwaggerEditor.PythonAi.ModelsForTesting
{
    public class TemporaryClassForTesting
    {
        public static SendMessageResponse SendMessage(SendMessageRequest body)
        {
            return new SendMessageResponse()
            {
                Message = $"Hello [user id:{body.UserId}], I'm the PythonAi Mock Server"
            };
        }
    }
   
}
