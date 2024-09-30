import axios from "axios";
import { CreateContact } from "../interfaces/CreateContact";
const api = axios.create({
  baseURL: "http://localhost:5001/api", // Use your local machine IP
});

export const getContacts = async (search: string) => {
  try {
    const response = await api.get(
      `contact/${search ? "?searchTerm=" + search : ""}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        console.log("Contacts not found");
        return null;
      }
      throw error;
    }
  }
};

export const getContactById = async (id: string) => {
  try {
    const response = await api.get(`/contact/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 404) {
        console.log("Contacts not found");
      } else {
        console.log("An error occurred", error.message);
      }
    } else {
      console.log("An unexpected error occurred", error);
    }
    throw error;
  }
};

export const createContact = async (contact: CreateContact) => {
  try {
    const response = await api.post("/contact", contact);
    return response.data;
  } catch (error) {
    console.log("An error occurred", error);
    throw error;
  }
};

export const updateContact = async (contact: CreateContact) => {
  try {
    const response = await api.put("/contact", contact);
    return response;
  } catch (error) {
    console.log("An error occurred", error);
    throw error;
  }
};

export const deleteContact = async (id: string) => {
  try {
    await api.delete(`/contact`, { params: { id } });
  } catch (error) {
    console.error("An error occurred", error);
    throw error;
  }
};
