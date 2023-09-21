import { Router } from 'express';
import { addGig, getGigs } from '../controllers/gigController';

const router = Router();

router.get('/', getGigs)
router.post('/add-gig', addGig)

export default router;