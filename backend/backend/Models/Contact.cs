namespace backend.Models
{
    public class Contact
    {
        // create a contact model with Id type of Guid, FirstName, LastName, Email, PhoneNumber, and Address
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }

    }
}
