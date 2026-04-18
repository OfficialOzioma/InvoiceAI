import { Router } from 'express';
import { getInvoices, getBuilder, createAiDraft } from '../controllers/invoiceController.js';

const router = Router();

router.get('/', getInvoices);
router.get('/new', getBuilder);
router.post('/ai-draft', createAiDraft);

export default router;
