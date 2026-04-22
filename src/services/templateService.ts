import { defaultTemplates } from './defaultTemplates.js';

export interface Template {
    id: string;
    name: string;
    content: string;
    isDefault: boolean;
}

class TemplateService {
    async listTemplates(businessId?: string): Promise<Template[]> {
        const templates: Template[] = [];
        
        // Add default system templates
        for (const [filename, content] of Object.entries(defaultTemplates)) {
            const name = filename.replace('.html', '');
            templates.push({
                id: name,
                name: name.charAt(0).toUpperCase() + name.slice(1),
                content: content,
                isDefault: true
            });
        }
        
        // TODO: In a real environment, fetch custom templates from Firebase where owner = businessId
        return templates;
    }

    async getTemplate(id: string): Promise<Template | null> {
        // Check defaults first
        if (defaultTemplates[id + '.html']) {
            return {
                id,
                name: id.charAt(0).toUpperCase() + id.slice(1),
                content: defaultTemplates[id + '.html'],
                isDefault: true
            };
        }
        return null;
    }

    renderTemplate(content: string, data: any): string {
        // Very basic placeholder injection
        let rendered = content;
        for (const [key, value] of Object.entries(data)) {
            if (key === 'items' && Array.isArray(value)) {
                // Generate items HTML
                let itemsHtml = '';
                for (const item of value) {
                    itemsHtml += `<div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0;">
                                     <div style="flex: 1;">${item.description || 'Item'}</div>
                                     <div style="width: 100px; text-align: right;">$${Number(item.price * item.quantity).toFixed(2)}</div>
                                   </div>`;
                }
                rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), itemsHtml);
            } else if (key === 'items_table_rows' && Array.isArray(value)) {
                let itemsHtml = '';
                for (const item of value) {
                    itemsHtml += `<tr>
                                     <td style="border: 1px solid #000; padding: 10px;">${item.description || 'Item'}</td>
                                     <td style="border: 1px solid #000; padding: 10px; text-align: right;">$${Number(item.price * item.quantity).toFixed(2)}</td>
                                   </tr>`;
                }
                rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), itemsHtml);
            } else if (key === 'items_table_rows_standard' && Array.isArray(value)) {
                 let itemsHtml = '';
                 for (const item of value) {
                     itemsHtml += `<tr style="border-bottom: 1px solid #f1f5f9;">
                                     <td style="padding: 12px 16px; font-size: 13px;">${item.description || 'Item'}</td>
                                     <td style="padding: 12px 16px; text-align: right; font-size: 13px; font-weight: 600;">$${Number(item.price * item.quantity).toFixed(2)}</td>
                                   </tr>`;
                 }
                 rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), itemsHtml);
            } else if (key === 'items_table_rows_timesheet' && Array.isArray(value)) {
                 let itemsHtml = '';
                 for (const item of value) {
                     itemsHtml += `<tr style="border-bottom: 1px solid #000;">
                                     <td style="padding: 10px; font-size: 13px;">${item.description || 'Service'}</td>
                                     <td style="padding: 10px; text-align: right; font-size: 13px;">${item.quantity}</td>
                                     <td style="padding: 10px; text-align: right; font-size: 13px;">$${Number(item.price).toFixed(2)}</td>
                                     <td style="padding: 10px; text-align: right; font-size: 13px; font-weight: bold;">$${Number(item.price * item.quantity).toFixed(2)}</td>
                                   </tr>`;
                 }
                 rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), itemsHtml);
            } else if (key === 'items_table_rows_commercial' && Array.isArray(value)) {
                 let itemsHtml = '';
                 for (const item of value) {
                     itemsHtml += `<tr>
                                     <td style="border: 1px solid #000; padding: 4px;">${item.description}</td>
                                     <td style="border: 1px solid #000; padding: 4px;">${item.hs_code || '8471.30'}</td>
                                     <td style="border: 1px solid #000; padding: 4px;">${item.origin || 'USA'}</td>
                                     <td style="border: 1px solid #000; padding: 4px; text-align: center;">${item.quantity}</td>
                                     <td style="border: 1px solid #000; padding: 4px; text-align: right;">$${Number(item.price * item.quantity).toFixed(2)}</td>
                                   </tr>`;
                 }
                 rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), itemsHtml);
            } else if (key === 'items_table_rows_compact' && Array.isArray(value)) {
                 let itemsHtml = '';
                 for (const item of value) {
                     itemsHtml += `<tr>
                                      <td style="padding: 4px 0;">${item.description || 'Item'}</td>
                                      <td style="padding: 4px 0; text-align: right;">$${Number(item.price * item.quantity).toFixed(2)}</td>
                                    </tr>`;
                 }
                 rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), itemsHtml);
            } else {
                rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
            }
        }
        return rendered;
    }
}

export const templateService = new TemplateService();
