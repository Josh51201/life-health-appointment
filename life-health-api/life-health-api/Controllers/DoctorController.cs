using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using life_health_api.Models;

namespace life_health_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly DataContext _db;

        public DoctorController(DataContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<Doctor>> Get()
        {
            return Ok(await _db.Doctors.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> Get(int id)
        {
            var doctor = await _db.Doctors.FindAsync(id);
            if (doctor == null) return BadRequest("Doctor not found");
            return Ok(doctor);
        }

        [HttpPost]
        public async Task<ActionResult<List<Doctor>>> AddDoctor(Doctor doctor)
        {
            _db.Doctors.Add(doctor);
            await _db.SaveChangesAsync();

            return Ok(await _db.Doctors.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Doctor>>> UpdateDoctor(Doctor doctor)
        {
            var doc = await _db.Doctors.FindAsync(doctor.Id);
            if (doc == null) return BadRequest("Doctor not found");

            doc.Name = doctor.Name;
            doc.PhoneNumber = doctor.PhoneNumber;
            doc.Email = doctor.Email;
            doc.Specialty = doctor.Specialty;
            doc.Picture = doctor.Picture;
            doc.Location = doctor.Location;

            await _db.SaveChangesAsync();

            return Ok(await _db.Doctors.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Doctor>> Delete(int id)
        {
            var doctor = await _db.Doctors.FindAsync(id);
            if (doctor == null) return BadRequest("Doctor not found");

            _db.Doctors.Remove(doctor);
            await _db.SaveChangesAsync();

            return Ok(await _db.Doctors.ToListAsync());
        }
    }
}
