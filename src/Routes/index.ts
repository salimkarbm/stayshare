import { Router } from 'express';
import authRoutes from './Auth/auth.routes';
import accommodationRoutes from './Accommodations/accommodation.routes';
import userRoutes from './Users/user.routes';

const router = Router();

// authentication routes
router.use('/auth', authRoutes);

// accommodation routes
router.use('/accommodations', accommodationRoutes);

// user routes
router.use('/users', userRoutes);

export default router;
