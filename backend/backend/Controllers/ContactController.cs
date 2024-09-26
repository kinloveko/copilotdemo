using backend.DTOs;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        //create a constructor to inject the IContactServices
        private readonly IContactServices _contactServices;

        public ContactController(IContactServices contactServices)
        {
            _contactServices = contactServices;
        }

        // create a method that will return all contacts
        [HttpGet]
        public IActionResult GetContacts([FromQuery] string searchTerm)
        {
            var contacts = _contactServices.GetAllContacts(searchTerm);
            if(contacts.Count()==0)
            {
                return NotFound();
            }
            return Ok(contacts);
        }

        // create a method that will return a contact by Id
        [HttpGet("{id}")]
        public IActionResult GetContactById(Guid id)
        {
            var contact = _contactServices.GetContactById(id);
            if(contact == null)
            {
                return NotFound();
            }
            return Ok(contact);
        }

        // create a method that will create a contact
        [HttpPost]
        public IActionResult CreateContact([FromBody] CreateContactDTO contact)
        {
            var newContact = _contactServices.CreateContact(contact);
            return CreatedAtAction(nameof(GetContactById), new { id = newContact.Id }, newContact);
        }

        [HttpPut]
        public IActionResult UpdateContact([FromBody] UpdateContactDTO contact)
        {
            var updatedContact = _contactServices.UpdateContact(contact);
            return Ok(updatedContact);
        }

        [HttpDelete]
        public IActionResult DeleteContact(Guid id)
        {
            _contactServices.DeleteContact(id);
            return NoContent();
        }
    }
}
