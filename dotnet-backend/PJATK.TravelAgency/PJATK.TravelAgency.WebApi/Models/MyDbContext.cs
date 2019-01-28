using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace PJATK.TravelAgency.WebApi.Models
{
    public class MyDbContext : DbContext
    {
        //TODO: zrobić migrację do bazy były zmiany
        public DbSet<Administrator> Administrators { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Type> Types { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        public MyDbContext() : base("name=MyDbConnection")
        {

        }
    }
}