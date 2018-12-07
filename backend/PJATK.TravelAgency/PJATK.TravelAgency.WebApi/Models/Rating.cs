using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
        [Key]
        public Guid Id { get; set; }

        [Required]
        public RateMark RateMark { get; set; }

        [StringLength(555)]
        public string Comment { get; set; }
    }
}