﻿using PJATK.TravelAgency.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using Newtonsoft.Json;

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
        public JsonResult<List<Trip>> GetAllTrips()
        {
            var trips = _context.Trips.ToList();            

            return Json(trips);
        }

        [HttpGet]
        public JsonResult<Trip> GetTrip(Guid id)
        {
            var trip = _context.Trips.
                Where(x => x.Id == id).
                FirstOrDefault();

            return Json(trip);
        }

        [HttpPut]        
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
    }
}
