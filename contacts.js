const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");
const chalk = require("chalk");

const contactsPath = path.join("db", "contacts.json");
("");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, "\t"));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removeContact;
};

const isPhoneNumberUnique = async (phone) => {
  const contacts = await listContacts();
  return !contacts.some((contact) => contact.phone === phone);
};

const addContact = async (name, email, phone) => {
  if (!(await isPhoneNumberUnique(phone))) {
    console.log(
      chalk.bold.bgRed("Contact with the same phone number already exists.")
    );
    return "";
  }
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: uuid(),
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
