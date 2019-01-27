using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace PJATK.TravelAgency.WebApi.Models
{
    public class Reservation
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public bool IsPayed { get; set; }

        [ForeignKey("Rating")]
        public Guid RatingId { get; set; }
        public Rating Rating
        {
            get
            {
                return Rating;
            }
            set
            {
                if (IsPayed) { this.Rating = value; }
                else { throw new Exception("Aby ocenić wycieczkę lub dodać komentarz należy ją opłacić!"); }
            }
        }
    }
}