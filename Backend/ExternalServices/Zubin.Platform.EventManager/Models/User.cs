using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Zubin.Platform.WebApi
{
    public class User
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName{ get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string CreatedAt { get; set; }
        public Role Role{ get; set; }
    }

    public class Volunteer
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string CreatedAt { get; set; }
        public Role Role { get; set; }
        public List<string> Skills { get; set; }
    }

    public class Participant
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string CreatedAt { get; set; }
        public Role Role { get; set; }
        public List<string> Skills { get; set; }
    }

    public class Admin
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string CreatedAt { get; set; }
        public Role Role { get; set; }
    }

    public enum Role
    {
       Participant, 
       Volunteer,
       Admin
    }

}
