using backend.DTOs;

namespace backend.Services
{
    public interface IContactServices
    {
        // create a method to get all contacts
        IEnumerable<ReadContactDTO> GetAllContacts(string searchTerm = null);
        // create a method to get a contact by Id
        ReadContactDTO GetContactById(Guid id);
        // create a method to create a contact
        ReadContactDTO CreateContact(CreateContactDTO contact);
        // create a method to update a contact
        ReadContactDTO UpdateContact(UpdateContactDTO contact);
        // create a method to delete a contact
        void DeleteContact(Guid id);
    }
}
