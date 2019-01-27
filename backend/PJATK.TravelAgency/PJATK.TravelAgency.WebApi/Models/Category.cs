using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PJATK.TravelAgency.WebApi.Models
{
    public abstract class Category
    {
        public Guid Id { get; set; }

        [StringLength(255)]
        public string Name { get; set; }
    }
}