import { Router } from 'express';
import { checkAuth } from '../middleware/auth.js';
import { templateService } from '../services/templateService.js';

const router = Router();

router.get('/', checkAuth, async (req, res) => {
    const templates = await templateService.listTemplates();
    res.render('pages/templates', {
        title: 'Templates | InvoiceAI',
        layout: 'dashboard-layout',
        user: (req as any).user,
        templates
    });
});

router.get('/new', checkAuth, (req, res) => {
    res.render('pages/template-editor', {
        title: 'Create Template | InvoiceAI',
        layout: 'dashboard-layout',
        user: (req as any).user
    });
});

router.get('/edit/:id', checkAuth, async (req, res) => {
    const template = await templateService.getTemplate(req.params.id);
    if (!template) {
        return res.status(404).send('Template not found');
    }
    if (template.isDefault) {
       // Cannot edit default system templates
       return res.redirect('/templates');
    }

    res.render('pages/template-editor', {
        title: 'Edit Template | InvoiceAI',
        layout: 'dashboard-layout',
        user: (req as any).user,
        template
    });
});

router.get('/preview/:id', checkAuth, async (req, res) => {
    const template = await templateService.getTemplate(req.params.id);
    if (!template) {
        return res.status(404).send('Template not found');
    }

    const sampleData = {
        business_name: 'Acme Corporation',
        client_name: 'John Doe LLC',
        invoice_number: '10042',
        date: new Date().toLocaleDateString(),
        total_amount: '$1,500.00',
        items: [
            { description: 'Consulting Services', price: 1000, quantity: 1 },
            { description: 'Server Hosting', price: 250, quantity: 2 }
        ],
        items_table_rows: [
            { description: 'Consulting Services', price: 1000, quantity: 1 },
            { description: 'Server Hosting', price: 250, quantity: 2 }
        ],
        items_table_rows_compact: [
            { description: 'Consulting Services', price: 1000, quantity: 1 },
            { description: 'Server Hosting', price: 250, quantity: 2 }
        ]
    };

    const rendered = templateService.renderTemplate(template.content, sampleData);
    res.send(rendered);
});

export default router;
