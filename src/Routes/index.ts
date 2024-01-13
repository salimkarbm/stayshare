import { Router } from 'express';
import authRoutes from './Auth/auth.routes';
import accommodationRoutes from './Accommodations/accommodation.routes';

const router = Router();

// authentication routes
router.use('/auth', authRoutes);

// accommodation routes
router.use('/accommodations', accommodationRoutes);

export default router;
