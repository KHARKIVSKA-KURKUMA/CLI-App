const chalk = require("chalk");
const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    /* ---------------------------------- LIST ---------------------------------- */
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;
    /* ----------------------------------- GET ---------------------------------- */
    case "get":
      const getContact = await contacts.getContactById(id);
      console.log(getContact);
      break;
    /* ----------------------------------- ADD ---------------------------------- */
    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;
    /* --------------------------------- REMOVE --------------------------------- */
    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;
    /* --------------------------------- DEFAULT -------------------------------- */
    default:
      console.log(chalk.bold.bgRed(" Unknown action type!"));
  }
};

invokeAction(argv);
