using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PJATK.TravelAgency.WebApi.Models
{
    public class Trip
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public DateTime DepartureDate { get; set; }
        public DateTime ArrivalDate { get; set; }
        public decimal Price { get; set; }
        public string Describe { get; set; }
        public string DeparturePlace { get; set; }
        public int NumberOfPlaces { get; set; }
        public int AvaiableNumberOfPlaces { get; set; }
        public bool Archive { get; set; }
        public int Promote { get; set; }
    }
}