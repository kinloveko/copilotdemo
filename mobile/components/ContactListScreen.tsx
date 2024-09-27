import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useContacts } from "../ContactProvider";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { getContacts } from "../services/api";
import { Contact } from "../interfaces/Contact";
const ContactListScreen = () => {
  const { contacts, setContacts } = useContacts();
  const navigation = useNavigation<NavigationProp<any>>();
  const [search, setSearch] = useState("");
  // i want to add a delay in my search text input before triggering the search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  // create a useEffect that will get the contacts from the api and set the contacts in the context and it is async
  useEffect(() => {
    const fetchContacts = async () => {
      const contacts = await getContacts(debouncedSearch);
      if (contacts) {
        setContacts(contacts.data);
      } else {
        setContacts([]);
      }
    };
    fetchContacts();
  }, [debouncedSearch]);

  //create a function that will navigate to the CreateContactScreen
  const addContact = () => {
    navigation.navigate("Create");
  };

  // create a method that will handle a navigation to updateScreen
  const editContact = (contact: Contact) => {
    navigation.navigate("Update", { contact });
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", marginLeft: 5, marginRight: 5 }}>
        <TextInput
          style={styles.inputsearch}
          placeholder="Search for contacts"
          onChangeText={(text) => setSearch(text)}
        />
        <TouchableOpacity style={styles.buttonCreate} onPress={addContact}>
          <Text
            style={{
              color: "white",
              paddingLeft: 5,
              paddingRight: 5,
              fontSize: 20,
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
      {contacts.length > 0 ? (
        <FlatList
          data={contacts}
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => editContact(item)}
              key={index}
              style={styles.item}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ width: "55%" }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.firstName + " " + item.lastName + " "}
                    </Text>
                    <Text>{item.phoneNumber}</Text>
                  </View>
                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{ width: "55%" }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.email}
                    </Text>
                    <Text>{item.address}</Text>
                  </View>
                </View>
                <Text
                  style={{
                    marginStart: 10,
                    color: "darkgray",
                    textDecorationLine: "underline",
                  }}
                >
                  Edit
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={{ color: "darkgray", marginTop: 10 }}>
          No contacts found
        </Text>
      )}
    </View>
  );
};

export default ContactListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  inputsearch: {
    alignSelf: "center",
    width: "90%",
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#f1f1f1",
    //add a borderwidth and bordercolor black and 1
    borderColor: "black",
    borderWidth: 1,
  },
  item: {
    padding: 40,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  buttonCreate: {
    //create a style for the buttonCreate
    alignSelf: "center",
    width: 40,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "black",
  },
});
