using PJATK.TravelAgency.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace PJATK.TravelAgency.WebApi.Controllers
{
    [RoutePrefix("travelAgency/trips")]
    public class TripController : ApiController
    {
        private MyDbContext _context;

        public TripController()
        {
            _context = new MyDbContext();
        }

        [HttpGet]
        [Route("")]
        public JsonResult<List<Trip>> GetAllTrips()
        {
            var trips = _context.Trips.ToList();            

            return Json(trips);
        }

        [HttpGet]
        [Route("{id}")]
        public JsonResult<Trip> GetTrip([FromUri]Guid id)
        {
            var trip = _context.Trips.
                Where(x => x.Id == id).
                FirstOrDefault();

            return Json(trip);
        }

        [HttpPut] 
        [Route("add")]
        [EnableCors(origins: "https://travelagencyapp.azurewebsites.net", headers: "*", methods: "*")]
        [Authorize]
        public IHttpActionResult AddTrip([FromBody] Trip trip)
        {
            try
            {
                _context.Trips.Add(trip);
                _context.SaveChanges();
                return Ok(trip);
            }
            catch(Exception ex)
            {
                return BadRequest("Wystąpił błąd podczas próby dodania nowej wycieczki." + ex.Message);
            }
            
        }
        [Route("delete/{tripId}")]
        [HttpDelete]
        [Authorize]
        public IHttpActionResult DeleteTrip([FromUri] Guid tripId)
        {
            try
            {
                var tripToDelete = _context.Trips.Where(x => x.Id == tripId).FirstOrDefault();
                _context.Trips.Remove(tripToDelete);
                _context.SaveChanges();
                return Ok("Successfully added a trip");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
