using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PJATK.TravelAgency.WebApi.Models
{
    public class User : Person
    {
        [Key]
        public Guid Id { get; set; }

        //TODO: jak zrobić relację jeden do wielu w EF Code First?
        public HashSet<Reservation> Reservations { get; set; }
    }
}