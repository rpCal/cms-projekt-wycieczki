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
    public class TypeController : ApiController
    {
        private MyDbContext _context;

        public TypeController()
        {
            _context = new MyDbContext();
        }

        [HttpGet]
        [Route("types")]
        public JsonResult<List<Models.Type>> GetAllTypes()
        {
            var types = _context.Types.ToList();

            return Json(types);
        }

        [HttpGet]
        [Route("types/{typeId}")]
        public JsonResult<Models.Type> GetType([FromUri] Guid typeId)
        {
            var type = _context.Types
                .Where(x => x.Id == typeId)
                .FirstOrDefault();

            return Json(type);
        }

        [HttpPut]
        [Route("types/modify")]
        public IHttpActionResult ModifyType([FromBody] Models.Type type)
        {
            try
            {
                var typeFromDb = _context.Types
                .Where(x => x.Id == type.Id)
                .FirstOrDefault();

                typeFromDb = type;
                _context.SaveChanges();

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("types/add")]
        public IHttpActionResult AddAType([FromBody] Models.Type type)
        {
            try
            {
                _context.Types.Add(type);
                _context.SaveChanges();

                return Ok(type);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("types/delete/{typeId}")]
        public IHttpActionResult DeleteType([FromUri] Guid typeId)
        {
            try
            {
                var typeToDelete = _context.Types
                .Where(x => x.Id == typeId)
                .FirstOrDefault();

                _context.Types.Remove(typeToDelete);
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
