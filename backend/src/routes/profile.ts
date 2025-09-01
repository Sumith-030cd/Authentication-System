import { Router } from 'express';
import { requireAuth } from '../middleware/requireAuth';
import { getProfile } from '../controllers/profileController';

const router = Router();

router.get('/', requireAuth, getProfile);

export default router;
