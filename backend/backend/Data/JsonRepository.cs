using backend.Models;
using System.Text.Json;

namespace backend.Data
{
    public class JsonRepository
    {
        public List<Contact> Contacts { get; set; }

        // create a constructor that reads the contacts.json file and deserializes it into a list of contacts
        public JsonRepository()
        {
            Contacts = JsonSerializer.Deserialize<List<Contact>>(File.ReadAllText("contacts.json"));
        }

        // create a method that writes the list of contacts to the contacts.json file
        public void SaveChanges()
        {
            File.WriteAllText("contacts.json", JsonSerializer.Serialize(Contacts));
        }

        // create a method that returns a list of contacts
        public List<Contact> GetContacts()
        {
            return Contacts;
        }

        // create a method that returns a contact by Id
        public Contact GetContactById(Guid id)
        {
            return Contacts.FirstOrDefault(contact => contact.Id == id);
        }

        // create a method that adds a contact to the list of contacts

        public void AddContact(Contact contact)
        {
            Contacts.Add(contact);
        }
        //create a method that updates a contact in the list of contacts
        public void UpdateContact(Contact contact)
        {
            var index = Contacts.FindIndex(c => c.Id == contact.Id);
            Contacts[index] = contact;
        }
            //create a method that will delete contacts
            public void DeleteContact(Guid id)  
            {
                var contact = Contacts.FirstOrDefault(c => c.Id == id);
                Contacts.Remove(contact);
            }

    }
}
