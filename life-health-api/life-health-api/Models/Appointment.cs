using System.ComponentModel.DataAnnotations.Schema;

namespace life_health_api.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public DateTime Date { get; set; } = new DateTime();
        public string Location { get; set; } = string.Empty;
        public int DoctorId { get; set; }
        public int UserId { get; set; }
    }
}
