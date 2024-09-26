using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Models;

namespace backend.Services
{
    public class ContactServices : IContactServices
    {
        private readonly JsonRepository jsonRepository;
        private readonly IMapper _mapper;
        
        public ContactServices(JsonRepository contactRepository, IMapper mapper)
        {
            jsonRepository = contactRepository;
            _mapper = mapper;
        }
        
        // create a method that will return all contacts from the repository and ignorecase when searching
        public IEnumerable<ReadContactDTO> GetAllContacts(string searchTerm = null)
        {
            if (string.IsNullOrEmpty(searchTerm))
            {
                return _mapper.Map<IEnumerable<ReadContactDTO>>(jsonRepository.GetContacts());
            }
            else
            {
                return _mapper.Map<IEnumerable<ReadContactDTO>>(jsonRepository.GetContacts().FindAll(contact => contact.FirstName.ToLower().Contains(searchTerm.ToLower()) ||contact.Address.ToLower().Contains(searchTerm.ToLower()) || contact.PhoneNumber.ToLower().Contains(searchTerm.ToLower()) || contact.Email.ToLower().Contains(searchTerm.ToLower()) || contact.LastName.ToLower().Contains(searchTerm.ToLower())));
            }
        }

        // create a method that will return a contact by Id
        public ReadContactDTO GetContactById(Guid id)
        {
            return _mapper.Map<ReadContactDTO>(jsonRepository.GetContactById(id));
        }

        // create a method that will create a contact
        public ReadContactDTO CreateContact(CreateContactDTO contact)
        {
            var newContact = _mapper.Map<Contact>(contact);
            jsonRepository.AddContact(newContact);
            jsonRepository.SaveChanges();
            return _mapper.Map<ReadContactDTO>(newContact);
        }

        // create a method that will update a contact
        public ReadContactDTO UpdateContact(UpdateContactDTO contact)
        {
            var updatedContact = _mapper.Map<Contact>(contact);
            jsonRepository.UpdateContact(updatedContact);
            jsonRepository.SaveChanges();
            return _mapper.Map<ReadContactDTO>(updatedContact);
        }

        // create a method that will delete a contact
        public void DeleteContact(Guid id)
        {
            jsonRepository.DeleteContact(id);
            jsonRepository.SaveChanges();
        }
    }
}
