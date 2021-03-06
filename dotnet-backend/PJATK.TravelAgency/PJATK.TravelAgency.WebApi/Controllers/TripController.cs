﻿using PJATK.TravelAgency.WebApi.Models;
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
    [EnableCors(origins: "*", headers: "*", methods: "*")]
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

        [HttpGet]
        [Route("rated")]
        public JsonResult<List<Trip>> GetTripsWithRating()
        {
            List<Trip> ratedTrips = new List<Trip>();

            var tripsRatings = _context.Trips
                .Select(x => x);
                

            foreach (var tripRating in tripsRatings)
            {
                var rate = _context.Ratings
                    .Where(x => x.Id == tripRating.RatingId)
                    .Select(x => x.RateMark)
                    .FirstOrDefault();

                if(rate > 0)
                {
                    ratedTrips.Add(tripRating);
                }
            }

            return Json(ratedTrips);
        }

        [HttpPut]
        [Route("update")]
        public IHttpActionResult ModifyTrip([FromBody]Trip trip)
        {
            try
            {
                var tripFromDb = _context.Trips
                    .Where(x => x.Id == trip.Id)
                    .FirstOrDefault();

                tripFromDb = trip;
                _context.SaveChanges();

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost] 
        [Route("add")]
        public IHttpActionResult AddTrip([FromBody] Trip trip)
        {
            try
            {
                _context.Trips.Add(trip);
                _context.SaveChanges();
                return Ok(trip);
            }
            catch
            {
                return BadRequest("Wystąpił błąd podczas próby dodania nowej wycieczki.");
            }
            
        }

        [HttpDelete]
        [Route("delete/{tripId}")]
        public IHttpActionResult DeleteTrip([FromUri] Guid tripId)
        {
            try
            {
                var tripToDelete = _context.Trips
                    .Where(x => x.Id == tripId)
                    .FirstOrDefault();

                _context.Trips.Remove(tripToDelete);
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
