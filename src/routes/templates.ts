import { Router } from 'express';
import { checkAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', checkAuth, (req, res) => {
    res.render('pages/templates', {
        title: 'Templates | InvoiceAI',
        layout: 'dashboard-layout',
        user: (req as any).user
    });
});

export default router;
