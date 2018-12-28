using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PJATK.TravelAgency.WebApi.Controllers
{
    [Route("auth")]
    public class AuthController : ApiController
    {
        [HttpPost]
        [Route("token")]
        public IHttpActionResult GetToken()
        {
            var tokenString = new JwtSecurityToken
            (
             issuer: "travelaggency.com"
             
            );
            
            return Ok();
        }
    }
}
