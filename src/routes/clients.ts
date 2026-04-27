import { Router } from 'express';
import { checkAuth } from '../middleware/auth.js';
import { getClients, createClient, updateClient, deleteClient } from '../controllers/clientController.js';

const router = Router();

router.use(checkAuth);

router.get('/', getClients);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
