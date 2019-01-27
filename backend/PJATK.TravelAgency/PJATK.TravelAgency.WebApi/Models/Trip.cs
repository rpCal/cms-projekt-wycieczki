using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PJATK.TravelAgency.WebApi.Models
{
    public class Trip
    {
        [Key]
        public Guid Id { get; set; }

        [StringLength(255)]
        public string Name { get; set; }

        [StringLength(255)]
        [Required]
        public string City { get; set; }

        [Required]
        public DateTime DepartureDate { get; set; }

        [Required]
        public DateTime ArrivalDate { get; set; }

        [Required]
        public decimal Price { get; set; }

        [StringLength(555)]
        public string Describe { get; set; }

        [StringLength(255)]
        public string DeparturePlace { get; set; }

        [Required]
        public int NumberOfPlaces { get; set; }

        [Required]
        public int AvaiableNumberOfPlaces { get; set; }

        public bool Archive { get; set; }
        public int Promote { get; set; }
               
        //TODO: jak zrobić relację jeden do wielu w EF Code First?
        public HashSet<Reservation> Reservations { get; set; }

        [ForeignKey("Rating")]
        public Guid RatingId { get; set; }

        public Rating Rating { get; set; }
    }
}