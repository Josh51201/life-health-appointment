using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using life_health_api.Models;

namespace life_health_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _db;

        public UserController(DataContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<User>> Get()
        {
            return Ok(await _db.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return BadRequest("User not found");
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<List<User>>> AddDoctor(User user)
        {
            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            return Ok(await _db.Users.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<User>>> UpdateDoctor(User user)
        {
            var result = await _db.Users.FindAsync(user.Id);
            if (result == null) return BadRequest("User not found");

            result.Name = user.Name;
            result.Username = user.Username;
            result.PhoneNumber = user.PhoneNumber;
            result.Email = user.Email;
            result.Password = user.Password;

            await _db.SaveChangesAsync();

            return Ok(await _db.Users.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> Delete(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return BadRequest("User not found");

            _db.Users.Remove(user);
            await _db.SaveChangesAsync();

            return Ok(await _db.Users.ToListAsync());
        }
    }
}
