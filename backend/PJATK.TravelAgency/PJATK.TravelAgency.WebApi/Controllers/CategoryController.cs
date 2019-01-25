using PJATK.TravelAgency.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace PJATK.TravelAgency.WebApi.Controllers
{
    public class CategoryController : ApiController
    {
        private MyDbContext _context;

        public CategoryController()
        {
            _context = new MyDbContext();
        }

        [HttpGet]
        [Route("categories")]
        public JsonResult<List<Category>> GetCategories()
        {
            var categories = _context.Categories.ToList();

            return Json(categories);
        }

        [HttpGet]
        [Route("category/{categoryId}")]
        public JsonResult<Category> GetCategory([FromUri] Guid categoryId)
        {
            var category = _context.Categories
                .Where(x => x.Id == categoryId)
                .FirstOrDefault();

            return Json(category);
        }

        [HttpPut]
        [Route("category/update")]
        public IHttpActionResult ModifyCategory([FromBody] Category category)
        {
            try
            {
                var categoryFromDb = _context.Categories
                .Where(x => x.Id == category.Id)
                .FirstOrDefault();

                categoryFromDb = category;

                _context.SaveChanges();

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("category/add")]
        public IHttpActionResult CreateCategory([FromBody] Category category)
        {
            try
            {
                _context.Categories.Add(category);
                _context.SaveChanges();

                return Ok(category);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("category/delete/{categoryId}")]
        public IHttpActionResult DeleteCategory([FromUri] Guid categoryId)
        {
            try
            {
                var categoryToDelete = _context.Categories
                    .Where(x => x.Id == categoryId)
                    .FirstOrDefault();

                _context.Categories.Remove(categoryToDelete);
                _context.SaveChanges();

                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
