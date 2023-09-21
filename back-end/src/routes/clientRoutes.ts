import { Router } from 'express';
import { addClient, editClient, getClient, getClients, removeClient, searchClient } from '../controllers/clientController';

const router = Router();

router.get('/', getClients);
router.get('/:id', getClient);
router.post('/add-client', addClient);
router.put('/edit-client/:id', editClient)
router.get('/search/:query', searchClient)
router.delete('/delete/:id', removeClient)

export default router;