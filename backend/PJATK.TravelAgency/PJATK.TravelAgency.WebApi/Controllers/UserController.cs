using PJATK.TravelAgency.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace PJATK.TravelAgency.WebApi.Controllers
{
    public class UserController : ApiController
    {
        private MyDbContext _context;

        public UserController()
        {
            _context = new MyDbContext();
        }

        [HttpGet]
        [Route("users")]
        public JsonResult<List<User>> GetAllUsers()
        {
            var users = _context.Users.ToList();

            return Json(users);
        }

        [HttpGet]
        [Route("users/{userId}")]
        public JsonResult<User> GetUser([FromUri] Guid userId)
        {
            var user = _context.Users
                .Where(x => x.Id == userId)
                .FirstOrDefault();

            return Json(user);
        }

        [HttpPut]
        [Route("users/update")]
        public IHttpActionResult ModifyUser([FromBody]User user)
        {
            try
            {
                var userFromDb = _context.Users
                .Where(x => x.Id == user.Id)
                .FirstOrDefault();

                userFromDb = user;
                _context.SaveChanges();

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("users/add")]
        public IHttpActionResult CreateUser([FromBody] User user)
        {
            try
            {
                _context.Users.Add(user);
                _context.SaveChanges();

                return Ok(user);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("users/delete/{userId}")]
        public IHttpActionResult DeleteUser([FromUri] Guid userId)
        {
            try
            {
                var userToDelete = _context.Users
                .Where(x => x.Id == userId)
                .FirstOrDefault();

                _context.Users.Remove(userToDelete);
                _context.SaveChanges();

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
