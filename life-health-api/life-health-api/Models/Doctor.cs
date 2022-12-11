using System.ComponentModel.DataAnnotations.Schema;

namespace life_health_api.Models
{
    public class Doctor
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Specialty { get; set; } = string.Empty;
        public string Picture { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public List<Appointment>? Appointments { get; set; }
    }
}
