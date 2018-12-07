namespace PJATK.TravelAgency.WebApi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedDataAnnotations : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Locations", "Name", c => c.String(nullable: false, maxLength: 255));
            AlterColumn("dbo.Trips", "City", c => c.String(nullable: false, maxLength: 255));
            AlterColumn("dbo.Types", "Name", c => c.String(nullable: false, maxLength: 255));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Types", "Name", c => c.String());
            AlterColumn("dbo.Trips", "City", c => c.String());
            AlterColumn("dbo.Locations", "Name", c => c.String());
        }
    }
}
