using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PJATK.TravelAgency.WebApi.Models
{
    public class User : Person
    {
        public Guid Id { get; set; }
    }
}