import { Router } from 'express';
import { addClient, getClient, getClients, removeClient, searchClient } from '../controllers/clientController';

const router = Router();

router.get('/', getClients);
router.get('/:id', getClient);
router.post('/add-client', addClient);
router.get('/search/:query', searchClient)
router.post('/verify', removeClient)

export default router;