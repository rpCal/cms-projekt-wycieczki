﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PJATK.TravelAgency.WebApi.Models
{
    public class Administrator : Person
    {
        [Key]
        public Guid Id { get; set; }
    }
}