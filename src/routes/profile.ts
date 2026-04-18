import { Router } from 'express';
import { checkAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', checkAuth, (req, res) => {
    res.render('pages/profile', {
        title: 'Profile | InvoiceAI',
        layout: 'dashboard-layout',
        user: (req as any).user
    });
});

export default router;
