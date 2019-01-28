using Microsoft.IdentityModel.Tokens;
using PJATK.TravelAgency.WebApi.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Web.Http;

namespace PJATK.TravelAgency.WebApi.Controllers
{
    [Route("auth")]
    public class AuthController : ApiController
    {
        private MyDbContext _context;

        public AuthController()
        {
            _context = new MyDbContext();
        }

        [HttpPost]
        [Route("token")]
        public IHttpActionResult GetToken()
        {
            var header = Request.Headers.GetValues("Authorization"); //in tut there was ["Authorization"]

            if(header.ToString().StartsWith("Basic"))
            {
                var credValue = header.ToString().Substring("Basic ".Length).Trim();
                var usernameAndPassString = Encoding.UTF8.GetString(Convert.FromBase64String(credValue));
                var usernameAndPass = usernameAndPassString.Split(':');

                var adminPass = _context.Users.Where(x => x.Email.Trim().StartsWith("admin")).Select(x => x.Password).FirstOrDefault();

                if(usernameAndPass[0].Trim().StartsWith("admin") && usernameAndPass[1] == adminPass)
                {
                    var claims = new[] { new Claim(ClaimTypes.Name, usernameAndPass[0])};
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("dsdsdsdsdsdsdsdsfdj4u5j4o594f9dfjdifjk0-098078fdjfdfjldfjldfjd")); //gets from config file
                    var signInCred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

                    var token = new JwtSecurityToken
                    (
                     issuer: "travelagency.com",
                     audience: "travelagency.com",
                     expires: DateTime.Now.AddMinutes(1),
                     claims: claims,
                     signingCredentials: signInCred
                    );

                    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                    return Ok(tokenString);
                }
                
            }            
            return BadRequest("wrong request");
            

        }
    }
}
