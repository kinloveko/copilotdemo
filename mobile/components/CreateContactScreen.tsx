import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CreateContact } from "../interfaces/CreateContact";
import { createContact } from "../services/api";
import React, { useState } from "react";
import { NavigationProp } from "@react-navigation/native";
import { useContacts } from "../ContactProvider";

const CreateContactScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { contacts, setContacts } = useContacts();
  const [contact, setContact] = useState<CreateContact>({
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

  //create a function that will handle the creation of the contact
  const handleCreateContact = async () => {
    try {
      const newContact = await createContact(contact);
      setContacts((prev) => [...prev, newContact]);
      navigation.navigate("Lists");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>First Name</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={(text) => handleChange("firstName", text)}
      />
      <Text style={styles.text}>Last Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={(text) => handleChange("lastName", text)}
      />
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => handleChange("email", text)}
      />
      <Text style={styles.text}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => handleChange("phoneNumber", text)}
      />
      <Text style={styles.text}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={(text) => handleChange("address", text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateContact}>
        <Text style={{ color: "white", textAlign: "center" }}>
          Create Contact
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateContactScreen;

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
  //style for text label
  text: {
    margin: 5,
  },
});
