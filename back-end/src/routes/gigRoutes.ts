import { Router } from 'express';
import { addGig, getGig, getGigs } from '../controllers/gigController';

const router = Router();

router.get('/', getGigs)
router.get('/:id', getGig)
router.post('/add-gig', addGig)

export default router;