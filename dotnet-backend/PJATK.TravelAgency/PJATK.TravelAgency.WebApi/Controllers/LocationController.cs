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
    public class LocationController : ApiController
    {
        private MyDbContext _context;

        public LocationController()
        {
            _context = new MyDbContext();
        }

        [HttpGet]
        [Route("locations")]
        public JsonResult<List<Location>> GetAllLocations()
        {
            var locations = _context.Locations.ToList();

            return Json(locations);
        }

        [HttpGet]
        [Route("locations/{locationId}")]
        public JsonResult<Location> GetLocation([FromUri] Guid locationId)
        {
            var location = _context.Locations
                .Where(x => x.Id == locationId)
                .FirstOrDefault();

            return Json(location);
        }

        [HttpPut]
        [Route("locations/update")]
        public IHttpActionResult ModifyLocation(Location location)
        {
            try
            {
                var locationFromDb = _context.Locations
                .Where(x => x.Id == location.Id)
                .FirstOrDefault();

                locationFromDb = location;
                _context.SaveChanges();

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("locations/create")]
        public IHttpActionResult CreateLocation(Location location)
        {
            try
            {
                _context.Locations.Add(location);
                _context.SaveChanges();

                return Ok(location);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("locations/delete/{locationId}")]
        public IHttpActionResult DeleteLocation([FromUri] Guid locationId)
        {
            try
            {
                var locationToDelete = _context.Locations
                    .Where(x => x.Id == locationId)
                    .FirstOrDefault();

                _context.Locations.Remove(locationToDelete);
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
