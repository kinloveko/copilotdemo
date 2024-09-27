// create a Contact Provider that will handle saving the contacts in the context and it has a getContacs and setContacs

import React, { createContext, useContext, useEffect, useState } from "react";
import { Contact } from "./interfaces/Contact";

//create a interface for ContactContext
interface ContactContextInterface {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

//create a context for ContactContext
const ContactContext = createContext<ContactContextInterface>({
  contacts: [],
  setContacts: () => {},
});

//create a provider for ContactProvider
export const ContactProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  return (
    <ContactContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactContext.Provider>
  );
};

//create a hook for useContact that will return the context of ContactContext
export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactProvider");
  }
  return context;
};
