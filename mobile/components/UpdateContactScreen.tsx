import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { updateContact, deleteContact } from "../services/api";
import React, { useState, useEffect } from "react";
import { NavigationProp } from "@react-navigation/native";
import { useContacts } from "../ContactProvider";
import { Contact } from "../interfaces/Contact";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
const UpdateContactScreen = () => {
  const route =
    useRoute<RouteProp<{ params: { contact: Contact } }, "params">>();

  const navigation = useNavigation<NavigationProp<any>>();
  const { contacts, setContacts } = useContacts();
  const [contact, setContact] = useState<Contact>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  //create a function that will handle changes in the input fields
  const handleChange = (name: string, value: string) => {
    setContact({ ...contact, [name]: value });
  };

  //create a useEffect that will get the route parameter being passed it is type of Contact
  useEffect(() => {
    if (route.params && (route.params as { contact: Contact }).contact) {
      const contactFromParams = (route.params as { contact: Contact }).contact;
      setContact(contactFromParams);
    }
  }, [route.params]);

  //create a function that will handle the creation of the contact
  const handleUpdateContact = async () => {
    try {
      const newContact = await updateContact(contact);

      setContacts((prev) =>
        prev.map((c) => {
          if (c.id === newContact.data.id) {
            return newContact.data;
          }
          return c;
        })
      );
      navigation.navigate("Lists");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteContact = async () => {
    console.log("delete", contact.id);
    try {
      await deleteContact(contact.id);
      setContacts((prev) => prev.filter((c) => c.id !== contact.id));
      navigation.navigate("Lists");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={contact.firstName}
        onChangeText={(text) => handleChange("firstName", text)}
      />
      <Text style={styles.text}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={contact.lastName}
        onChangeText={(text) => handleChange("lastName", text)}
      />
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={contact.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <Text style={styles.text}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={contact.phoneNumber}
        onChangeText={(text) => handleChange("phoneNumber", text)}
      />
      <Text style={styles.text}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={contact.address}
        onChangeText={(text) => handleChange("address", text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateContact}>
        <Text style={{ color: "white", textAlign: "center" }}>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2} onPress={handleDeleteContact}>
        <Text style={{ color: "white", textAlign: "center" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateContactScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    margin: 10,
  },
  //style for my input fields with 100% width
  input: {
    alignSelf: "center",
    width: "90%",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#f1f1f1",
    borderColor: "black",
    borderWidth: 1,
  },
  //style for my button
  button: {
    alignSelf: "center",
    width: "80%",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "black",
  },
  //style for my button
  button2: {
    alignSelf: "center",
    width: "80%",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "red",
  },
  //style for text label
  text: {
    margin: 5,
  },
});
