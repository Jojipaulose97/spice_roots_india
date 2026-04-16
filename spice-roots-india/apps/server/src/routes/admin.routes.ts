import express from 'express';
import { getAdminStats } from '../controllers/admin.controller';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.get('/stats', protect, admin, getAdminStats);

export default router;
