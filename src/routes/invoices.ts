import { Router } from 'express';
import { getInvoices, getBuilder, createAiDraft, getInvoiceDetail, updateInvoiceStatus, deleteInvoice, getEditBuilder, getPublicInvoice, getAiAssistant } from '../controllers/invoiceController.js';

const router = Router();

router.get('/', getInvoices);
router.get('/wizard', (req, res) => res.render('pages/invoice-wizard', { title: 'Create | InvoiceAI', layout: 'dashboard-layout' }));
router.get('/new', getBuilder);
router.get('/ai', getAiAssistant);
router.get('/edit/:id', getEditBuilder);
router.get('/public/:id', getPublicInvoice);
router.post('/ai-draft', createAiDraft);
router.get('/:id', getInvoiceDetail);
router.patch('/:id/status', updateInvoiceStatus);
router.delete('/:id', deleteInvoice);

export default router;
