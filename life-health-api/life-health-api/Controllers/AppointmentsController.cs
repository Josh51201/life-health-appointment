using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using life_health_api.Models;

namespace life_health_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly DataContext _db;

        public AppointmentsController(DataContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<Appointment>> GetAppointment()
        {
            return Ok(await _db.Appointments.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            var appointment = await _db.Appointments.FindAsync(id);
            if (appointment == null) return BadRequest("Appointment not found");
            return Ok(appointment);
        }

        [HttpPost]
        public async Task<ActionResult<List<Appointment>>> AddAppointment(Appointment appointment)
        {
            _db.Appointments.Add(appointment);
            await _db.SaveChangesAsync();

            return Ok(await _db.Appointments.ToListAsync());
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<List<Appointment>>> Put(Appointment appointment)
        {
            var result = await _db.Appointments.FindAsync(appointment.Id);
            if (result == null) return BadRequest("Appointment not found: " + appointment.Id);

            result.Id = appointment.Id;
            result.DoctorId = appointment.DoctorId;
            result.UserId = appointment.UserId;
            result.Date = appointment.Date;
            result.Location = appointment.Location;

            await _db.SaveChangesAsync();

            return Ok(await _db.Appointments.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Appointment>> DeleteAppointment(int id)
        {
            var appointment = await _db.Appointments.FindAsync(id);
            if (appointment == null) return BadRequest("Appointment not found");

            _db.Appointments.Remove(appointment);
            await _db.SaveChangesAsync();

            return Ok(await _db.Appointments.ToListAsync());
        }
    }
}
