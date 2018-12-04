using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PJATK.TravelAgency.WebApi.Models
{
    public enum RateMark
    {
        VeryPoor, Poor, Good, VeryGood, Excelent
    }

    public class Rating
    {
        public Guid Id { get; set; }
        public RateMark RateMark { get; set; }
        public string Comment { get; set; }
    }
}