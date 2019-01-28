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
    public class RatingController : ApiController
    {
        private MyDbContext _context;

        public RatingController()
        {
            _context = new MyDbContext();
        }

        [HttpGet]
        [Route("ratings/get/{tripId}")]
        public JsonResult<Rating> GetTripRate([FromUri]Guid tripId)
        {
            var ratingId = _context.Trips
                .Where(x => x.Id == tripId)
                .Select(x => x.RatingId)
                .FirstOrDefault();

            var rating = _context.Ratings
                .Where(x => x.Id == ratingId)
                .FirstOrDefault();

            return Json(rating);
        }

        public JsonResult<double> GetTripRatingAverage([FromUri] Guid tripId)
        {
            var average = 0.0;
            var counter = 0;

            var ratingIds = _context.Trips
                .Where(x => x.Id == tripId)
                .Select(x => x.RatingId);

            foreach (var item in ratingIds)
            {
                var rate = _context.Ratings
                    .Where(x => x.Id == item)
                    .Select(x => x.RateMark)
                    .FirstOrDefault();

                //TODO: jak obliczyć średnią jak mamy enum?
                //average += rate;
            }

            return Json(average);
        }
    }
}
