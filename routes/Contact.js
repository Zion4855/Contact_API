import express from "express";
import {
  addContact,
  deleteContact,
  getAllContact,
  getContactByUserId,
  getContactById,
  updateContactById,
} from "../controllers/Contact.js";

import { Authenticate } from "../Middlewares/Auth.js";

const router = express.Router();

// get all contact
router.get("/", getAllContact);

// get contact by id
router.get("/:id", getContactById);

// add contact
router.post("/add", Authenticate, addContact);

// update contact
router.put("/:id", Authenticate, updateContactById);

// delete contact
router.delete("/:id", Authenticate, deleteContact);

// contact by userId
router.get('/userid/:id', getContactByUserId)

export default router;
