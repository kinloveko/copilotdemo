using AutoMapper;

namespace backend.Profiles
{
    public class ContactProfiles : Profile
    {
        public ContactProfiles()
        {
            // map the Contact model to the ReadContactDTO
            CreateMap<Models.Contact, DTOs.ReadContactDTO>().ReverseMap();
            // map the CreateContactDTO to the Contact model and generate the Id of Guid type newGuid
            CreateMap<DTOs.CreateContactDTO, Models.Contact>().ForMember(dest => dest.Id, opt => opt.MapFrom(src => System.Guid.NewGuid())).ReverseMap();
            // map the UpdateContactDTO to the Contact model
            CreateMap<DTOs.UpdateContactDTO, Models.Contact>().ReverseMap();
        }
    }
}
