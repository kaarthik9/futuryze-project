import express from 'express';

import { getContacts, createContacts, updateContact, deleteContact } from '../controllers/contacts.js'
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', auth, getContacts)
router.post('/', auth, createContacts)
router.patch('/:id', auth, updateContact)
router.delete('/:id', auth, deleteContact)

export default router;