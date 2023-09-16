import { Router } from 'express';
import { addClient, getClient, getClients, removeClient } from '../controllers/clientController';

const router = Router();

router.get('/', getClients);
router.get('/:id', getClient);
router.post('/add-client', addClient);
router.post('/verify', removeClient)

export default router;