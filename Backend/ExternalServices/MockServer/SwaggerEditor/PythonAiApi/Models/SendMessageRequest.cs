/*
 * Kuju API
 *
 * Kuju API
 *
 * OpenAPI spec version: 1
 * 
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 */
using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Microsoft.AspNetCore.SignalR;

namespace MockServer.SwaggerEditor.PythonAi.Models
{
    /// <summary>
    /// 
    /// </summary>

    public class SendMessageRequest
    {
        public string UserId { get; set; }
        public string Message { get; set; }
    }
}