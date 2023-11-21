import { Router } from 'express';
import authRoutes from './Auth/auth.routes';

const router = Router();

// authentication routes
router.use('/auth', authRoutes);

export default router;
