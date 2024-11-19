import { Contact } from "../Models/Contact.js";

// Get all contacts
export const getAllContact = async (req, res) => {
  // res.send("This is contact API")
  // res.json(contacts)
  const userContact = await Contact.find();
  if (!userContact)
    return res.status(404).json({ message: "No contact find", userContact });

  res.json({ message: "Contact fetced", userContact });
};

// Get specific contact
export const getContactById = async (req, res) => {
  const id = req.params.id;

  const userContact = await Contact.findById(id);
  if (!userContact)
    return res.status(404).json({ message: "No contact find", userContact });

  res.json({ message: "Contact fetced", userContact });

  // console.log(typeof(id));

  // const filterContact = contacts.filter((contact) => {
  //     return contact.id === parseInt(id);
  // })
  // res.json(filterContact)
};

// Add new contact

export const addContact = async (req, res) => {
  const { name, email, phone, type } = req.body;

  if (name == " " || email == " " || phone == " " || type == " ")
    return res.status(400).json({ message: "All fields are required" });

  const saveContact = await Contact.create({
    name,
    email,
    phone,
    type,
    user: req.user
  });

  res.json({ message: "Contact saved successfully", saveContact });
};

// Update contact
export const updateContactById = async (req, res) => {
  const id = req.params.id;
  const { name, email, phone, type } = req.body;
  const updateContact = await Contact.findByIdAndUpdate(
    id,
    { name, email, phone, type },
    { new: true }
  );

  if (!updateContact)
    return res.status(404).json({ message: "No contact find" });

  res.json({ message: "Contact updated suuccessfully", updateContact });
};

// Delete contact
export const deleteContact = async (req, res) => {
  const id = req.params.id;
  const deleteContact = await Contact.findByIdAndDelete(id);

  if (!deleteContact)
    return res.status(404).json({ message: "Contact not exist" });

  res.json({ message: "Contact delete successfullly" });
};

// get contact by userId
export const getContactByUserId = async (req, res) => {
  const id = req.params.id
  let contact = await Contact.find({user:id})
  if(!contact) return res.status(404).json({message:"Contact not find"})

    res.json({message:"User specfic contact", contact})
}