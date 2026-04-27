import { Router } from 'express';
import { getInvoices, getBuilder, createAiDraft, getInvoiceDetail, updateInvoiceStatus, deleteInvoice, getEditBuilder, getPublicInvoice, getAiAssistant, getAiInsights, createInvoice } from '../controllers/invoiceController.js';

const router = Router();

router.get('/', getInvoices);
router.post('/', createInvoice);
router.get('/wizard', getBuilder);
router.get('/new', getBuilder);
router.get('/ai', getAiAssistant);
router.get('/insights', getAiInsights);
router.get('/edit/:id', getEditBuilder);
router.get('/public/:id', getPublicInvoice);
router.post('/ai-draft', createAiDraft);
router.get('/:id', getInvoiceDetail);
router.patch('/:id/status', updateInvoiceStatus);
router.delete('/:id', deleteInvoice);

export default router;
