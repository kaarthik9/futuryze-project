import contactTemplate from "../models/contactTemplate.js";
import mongoose from "mongoose";

export const getContacts = async (req, res) => {
  try {
    const contactTemplates = await contactTemplate.find();
    res.status(200).json(contactTemplates);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createContacts = async (req, res) => {
  const contact = req.body;
  const newContact = new contactTemplate({ ...contact, creator: req.userId });

  try {
    await newContact.save();

    res.status(201).json(newContact);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const { firstName, lastName, email, phone } = req.body;
  const updatedContact = { firstName, lastName, email, phone, _id: id };

  try {
    await contactTemplate.findByIdAndUpdate(id, updatedContact, { new: true });
  } catch (error) {
    res.send(error.message);
  }

  res.json(updatedContact);
};


export const deleteContact = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  await contactTemplate.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
}