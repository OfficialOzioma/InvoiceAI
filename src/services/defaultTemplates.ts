export const defaultTemplates: Record<string, string> = {
    'minimal.html': `
<div style="font-family: sans-serif; padding: 40px; background: #fff; color: #333;">
  <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
    <h1 style="font-size: 24px; font-weight: bold; margin: 0;">{{business_name}}</h1>
    <div style="text-align: right;">
      <h2 style="font-size: 16px; margin: 0; color: #666;">INVOICE</h2>
      <p style="margin: 0; font-size: 12px; color: #999;">#{{invoice_number}}</p>
    </div>
  </div>
  <div style="margin-bottom: 40px;">
    <p style="font-size: 10px; text-transform: uppercase; color: #999; margin-bottom: 5px;">Billed To:</p>
    <p style="font-size: 14px; margin: 0;">{{client_name}}</p>
  </div>
  <div style="width: 100%; margin-bottom: 20px;">
    <div style="display: flex; border-bottom: 1px solid #eee; padding-bottom: 10px; font-size: 10px; text-transform: uppercase; color: #999;">
      <div style="flex: 1;">Description</div>
      <div style="width: 100px; text-align: right;">Total</div>
    </div>
    <div style="padding-top: 10px;">
      {{items}}
    </div>
  </div>
  <div style="display: flex; justify-content: flex-end; padding-top: 20px; font-weight: bold; border-top: 1px solid #eee;">
    <div style="margin-right: 20px;">Total Due:</div>
    <div>{{total_amount}}</div>
  </div>
</div>`,

    'corporate.html': `
<div style="font-family: Arial, sans-serif; background: #fff; color: #333; border: 1px solid #ddd;">
  <div style="background: #1e3a8a; padding: 20px 40px; color: #fff; display: flex; justify-content: space-between; align-items: center;">
    <h1 style="font-size: 20px; font-weight: bold; margin: 0;">{{business_name}}</h1>
    <div style="text-align: right;">
      <h2 style="font-size: 14px; margin: 0;">TAX INVOICE</h2>
      <p style="margin: 0; font-size: 12px; opacity: 0.8;">#{{invoice_number}}</p>
    </div>
  </div>
  <div style="padding: 40px;">
    <div style="border: 1px solid #eee; padding: 15px; margin-bottom: 30px; background: #f9fafb;">
      <p style="font-size: 10px; text-transform: uppercase; color: #666; margin-top: 0; margin-bottom: 5px; font-weight: bold;">Billed To:</p>
      <p style="font-size: 14px; margin: 0;">{{client_name}}</p>
    </div>
    <div style="width: 100%; margin-bottom: 30px;">
      <div style="display: flex; background: #f1f5f9; padding: 10px; font-size: 11px; text-transform: uppercase; font-weight: bold; border: 1px solid #e2e8f0;">
        <div style="flex: 1;">Item Description</div>
        <div style="width: 100px; text-align: right;">Amount</div>
      </div>
      <div style="padding: 10px 0;">
        {{items}}
      </div>
    </div>
    <div style="display: flex; justify-content: flex-end;">
      <div style="background: #1e3a8a; color: white; padding: 15px 30px; display: flex; gap: 20px; align-items: center;">
        <div style="font-size: 12px; text-transform: uppercase; font-weight: bold;">Total Due</div>
        <div style="font-size: 18px; font-weight: bold;">{{total_amount}}</div>
      </div>
    </div>
  </div>
</div>`,

    'bold.html': `
<div style="font-family: 'Helvetica Neue', sans-serif; padding: 40px; background: #fff; color: #000;">
  <div style="margin-bottom: 40px;">
    <h1 style="font-size: 48px; font-weight: 900; letter-spacing: -2px; margin: 0; line-height: 1;">{{business_name}}</h1>
  </div>
  <div style="display: flex; gap: 40px; margin-bottom: 40px;">
    <div style="flex: 1; background: #000; color: #fff; padding: 20px;">
      <p style="font-size: 12px; text-transform: uppercase; font-weight: bold; margin-bottom: 10px; opacity: 0.7;">Invoice No.</p>
      <p style="font-size: 24px; font-weight: bold; margin: 0;">#{{invoice_number}}</p>
    </div>
    <div style="flex: 2; background: #f4f4f5; padding: 20px;">
      <p style="font-size: 12px; text-transform: uppercase; font-weight: bold; margin-bottom: 10px; color: #71717a;">Billed To</p>
      <p style="font-size: 20px; font-weight: bold; margin: 0;">{{client_name}}</p>
    </div>
  </div>
  <div style="margin-bottom: 40px;">
    <div style="display: flex; border-bottom: 4px solid #000; padding-bottom: 10px; font-size: 12px; font-weight: bold; text-transform: uppercase;">
      <div style="flex: 1;">Service Description</div>
      <div style="width: 150px; text-align: right;">Amount</div>
    </div>
    <div style="padding-top: 20px; font-size: 18px; font-weight: 500;">
      {{items}}
    </div>
  </div>
  <div style="display: flex; justify-content: flex-end; align-items: baseline; gap: 20px;">
    <div style="font-size: 14px; font-weight: bold; text-transform: uppercase;">Total</div>
    <div style="font-size: 48px; font-weight: 900; letter-spacing: -1px;">{{total_amount}}</div>
  </div>
</div>`,

    'modern.html': `
<div style="font-family: system-ui, sans-serif; background: #fafafa; padding: 40px; color: #3f3f46;">
  <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #e4e4e7; padding-bottom: 20px; margin-bottom: 30px;">
    <div>
      <h1 style="font-size: 20px; font-weight: 600; margin: 0; color: #18181b;">{{business_name}}</h1>
    </div>
    <div style="text-align: right;">
      <div style="font-size: 20px; font-weight: 300;">INVOICE</div>
      <div style="font-size: 12px; color: #a1a1aa; margin-top: 4px;">#{{invoice_number}}</div>
    </div>
  </div>
  <div style="margin-bottom: 40px; padding: 20px; background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.02);">
    <p style="font-size: 10px; text-transform: uppercase; font-weight: 600; color: #a1a1aa; margin-top: 0; margin-bottom: 8px;">To</p>
    <p style="font-size: 16px; font-weight: 500; margin: 0; color: #18181b;">{{client_name}}</p>
  </div>
  <div style="background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.02); overflow: hidden;">
    <div style="display: flex; padding: 16px 20px; font-size: 11px; text-transform: uppercase; font-weight: 600; color: #71717a; border-bottom: 1px solid #f4f4f5;">
      <div style="flex: 1;">Item</div>
      <div style="width: 100px; text-align: right;">Total</div>
    </div>
    <div style="padding: 10px 20px;">
      {{items}}
    </div>
    <div style="display: flex; justify-content: flex-end; padding: 20px; background: #fdfdfd; border-top: 1px solid #f4f4f5;">
      <div style="display: flex; align-items: center; gap: 16px;">
        <span style="font-size: 12px; font-weight: 500; color: #71717a;">Amount Due</span>
        <span style="font-size: 24px; font-weight: 600; color: #18181b;">{{total_amount}}</span>
      </div>
    </div>
  </div>
</div>`,

    'classic.html': `
<div style="font-family: 'Times New Roman', serif; padding: 50px; background: #fff; color: #000; max-width: 800px; margin: 0 auto; border: 1px solid #ccc;">
  <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #000; padding-bottom: 20px;">
    <h1 style="font-size: 28px; margin: 0; text-transform: uppercase;">{{business_name}}</h1>
    <h2 style="font-size: 18px; margin: 10px 0 0 0; font-weight: normal; letter-spacing: 2px;">INVOICE</h2>
  </div>
  <table style="width: 100%; margin-bottom: 40px;">
    <tr>
      <td style="vertical-align: top;">
        <p style="margin: 0 0 5px 0;"><strong>Billed To:</strong></p>
        <p style="margin: 0;">{{client_name}}</p>
      </td>
      <td style="vertical-align: top; text-align: right;">
        <p style="margin: 0 0 5px 0;"><strong>Invoice Number:</strong> #{{invoice_number}}</p>
        <p style="margin: 0;"><strong>Date:</strong> {{date}}</p>
      </td>
    </tr>
  </table>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
    <thead>
      <tr>
        <th style="border: 1px solid #000; padding: 10px; text-align: left;">Description</th>
        <th style="border: 1px solid #000; padding: 10px; text-align: right; width: 120px;">Amount</th>
      </tr>
    </thead>
    <tbody>
      {{items_table_rows}}
    </tbody>
  </table>
  <div style="text-align: right;">
    <p style="font-size: 18px; margin: 0;"><strong>Total Due: {{total_amount}}</strong></p>
  </div>
</div>`,

    'dark.html': `
<div style="font-family: Roboto, sans-serif; padding: 40px; background: #121212; color: #e0e0e0;">
  <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 50px; border-bottom: 1px solid #333; padding-bottom: 20px;">
    <div>
      <h1 style="font-size: 24px; font-weight: 500; margin: 0; color: #fff;">{{business_name}}</h1>
    </div>
    <div style="text-align: right;">
      <div style="color: #03dac6; font-size: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Invoice</div>
      <div style="font-size: 16px; margin-top: 4px;">#{{invoice_number}}</div>
    </div>
  </div>
  <div style="background: #1e1e1e; padding: 20px; border-radius: 8px; margin-bottom: 40px;">
    <p style="font-size: 10px; color: #888; text-transform: uppercase; margin-top: 0; margin-bottom: 5px;">Client</p>
    <p style="font-size: 16px; color: #fff; margin: 0;">{{client_name}}</p>
  </div>
  <div style="margin-bottom: 40px;">
    <div style="display: flex; border-bottom: 1px solid #333; padding-bottom: 10px; color: #aaa; font-size: 12px; font-weight: 500;">
      <div style="flex: 1;">Item</div>
      <div style="width: 100px; text-align: right;">Total</div>
    </div>
    <div style="padding-top: 10px;">
      {{items}}
    </div>
  </div>
  <div style="display: flex; justify-content: flex-end; align-items: center; border-top: 1px solid #333; padding-top: 20px;">
    <div style="margin-right: 20px; color: #888; font-size: 12px; text-transform: uppercase;">Amount Due</div>
    <div style="font-size: 24px; color: #bb86fc; font-weight: bold;">{{total_amount}}</div>
  </div>
</div>`,

    'compact.html': `
<div style="font-family: sans-serif; padding: 20px; background: #fff; color: #000; font-size: 12px;">
  <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 10px;">
    <h1 style="font-size: 14px; margin: 0; font-weight: bold;">{{business_name}}</h1>
    <h2 style="font-size: 12px; margin: 0;">INV #{{invoice_number}}</h2>
  </div>
  <div style="margin-bottom: 10px;">
    <strong>To:</strong> {{client_name}}
  </div>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
    <thead style="border-bottom: 1px solid #ccc;">
      <tr>
        <th style="padding: 4px 0; text-align: left;">Item</th>
        <th style="padding: 4px 0; text-align: right; width: 80px;">Amount</th>
      </tr>
    </thead>
    <tbody>
      {{items_table_rows_compact}}
    </tbody>
  </table>
  <div style="text-align: right; border-top: 1px solid #000; padding-top: 5px;">
    <strong>Total: {{total_amount}}</strong>
  </div>
</div>`,

    'elegant.html': `
<div style="font-family: 'Georgia', serif; padding: 50px; background: #fcfbf9; color: #2c3e50;">
  <div style="text-align: center; margin-bottom: 50px;">
    <h1 style="font-size: 28px; margin: 0; font-weight: normal; letter-spacing: 2px;">{{business_name}}</h1>
    <div style="margin: 15px auto; width: 40px; border-top: 1px solid #bdc3c7;"></div>
    <h2 style="font-size: 14px; margin: 0; color: #7f8c8d; letter-spacing: 4px; text-transform: uppercase;">Invoice No. {{invoice_number}}</h2>
  </div>
  <div style="margin-bottom: 40px; text-align: center;">
    <p style="font-size: 10px; color: #95a5a6; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Billed To</p>
    <p style="font-size: 16px; margin: 0;">{{client_name}}</p>
  </div>
  <div style="margin-bottom: 40px;">
    <div style="display: flex; border-bottom: 1px solid #ecf0f1; padding-bottom: 10px; font-size: 11px; text-transform: uppercase; color: #7f8c8d; letter-spacing: 1px;">
      <div style="flex: 1;">Description</div>
      <div style="width: 120px; text-align: right;">Total</div>
    </div>
    <div style="padding-top: 15px;">
      {{items}}
    </div>
  </div>
  <div style="display: flex; justify-content: flex-end; padding-top: 20px; border-top: 1px solid #ecf0f1; align-items: center;">
    <span style="font-size: 12px; color: #7f8c8d; text-transform: uppercase; letter-spacing: 1px; margin-right: 15px;">Total Due</span>
    <span style="font-size: 20px; font-weight: bold;">{{total_amount}}</span>
  </div>
</div>`,

    'creative.html': `
<div style="font-family: 'Poppins', sans-serif; display: flex; background: #fff; color: #333; min-height: 500px;">
  <div style="background: #f43f5e; color: white; width: 200px; padding: 40px;">
    <h1 style="font-size: 24px; font-weight: 800; margin: 0 0 40px 0; line-height: 1.2;">{{business_name}}</h1>
    <div style="margin-bottom: 30px;">
      <h2 style="font-size: 12px; opacity: 0.8; text-transform: uppercase; margin-bottom: 5px; font-weight: 600;">Invoice #</h2>
      <p style="margin: 0; font-size: 16px; font-weight: bold;">{{invoice_number}}</p>
    </div>
    <div>
      <h2 style="font-size: 12px; opacity: 0.8; text-transform: uppercase; margin-bottom: 5px; font-weight: 600;">Bill To</h2>
      <p style="margin: 0; font-size: 14px;">{{client_name}}</p>
    </div>
  </div>
  <div style="flex: 1; padding: 40px;">
    <div style="width: 100%; margin-bottom: 40px;">
      <div style="display: flex; border-bottom: 2px solid #fecdd3; padding-bottom: 10px; font-size: 12px; color: #f43f5e; font-weight: bold; text-transform: uppercase;">
        <div style="flex: 1;">Description</div>
        <div style="width: 100px; text-align: right;">Amount</div>
      </div>
      <div style="padding-top: 20px; font-size: 14px; color: #52525b;">
        {{items}}
      </div>
    </div>
    <div style="display: flex; justify-content: flex-end; align-items: center; margin-top: 40px;">
      <div style="background: #f43f5e; color: white; padding: 15px 30px; border-radius: 30px; display: flex; gap: 15px; align-items: center; box-shadow: 0 10px 25px rgba(244,63,94,0.3);">
        <span style="font-size: 12px; font-weight: 600; text-transform: uppercase;">Total</span>
        <span style="font-size: 20px; font-weight: 800;">{{total_amount}}</span>
      </div>
    </div>
  </div>
</div>`,

    'professional.html': `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background: #fff; color: #2d3748;">
  <div style="display: flex; justify-content: space-between; border-bottom: 3px solid #3182ce; padding-bottom: 20px; margin-bottom: 30px;">
    <div>
      <h1 style="font-size: 22px; font-weight: bold; margin: 0; color: #2b6cb0;">{{business_name}}</h1>
    </div>
    <div style="text-align: right;">
      <h2 style="font-size: 18px; margin: 0; color: #4a5568; font-weight: 600;">INVOICE</h2>
      <p style="margin: 4px 0 0 0; font-size: 12px; color: #718096;">#{{invoice_number}}</p>
    </div>
  </div>
  <div style="display: flex; margin-bottom: 40px;">
    <div style="width: 50%;">
      <p style="font-size: 11px; text-transform: uppercase; font-weight: bold; color: #a0aec0; margin: 0 0 4px 0;">Invoice To:</p>
      <p style="font-size: 15px; font-weight: 500; margin: 0;">{{client_name}}</p>
    </div>
  </div>
  <div style="margin-bottom: 40px;">
    <div style="display: flex; background: #edf2f7; padding: 12px; font-size: 12px; font-weight: bold; color: #4a5568; border-radius: 4px;">
      <div style="flex: 1;">Item Description</div>
      <div style="width: 120px; text-align: right;">Amount</div>
    </div>
    <div style="padding: 10px; font-size: 14px;">
      {{items}}
    </div>
  </div>
  <div style="display: flex; justify-content: flex-end; padding-top: 20px; border-top: 1px solid #e2e8f0;">
    <div style="width: 250px;">
      <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: bold; color: #2b6cb0; padding: 10px 0;">
        <span>Total Due:</span>
        <span>{{total_amount}}</span>
      </div>
    </div>
  </div>
</div>`,

    'standard-plus.html': `
<div style="font-family: 'Inter', sans-serif; padding: 40px; background: #fff; color: #1e293b;">
  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 40px;">
    <div>
      <h1 style="font-size: 24px; font-weight: 800; color: #0f172a; margin: 0;">{{business_name}}</h1>
      <p style="font-size: 12px; color: #64748b; margin-top: 4px;">Standard Business Invoice</p>
    </div>
    <div style="text-align: right;">
      <h2 style="font-size: 28px; font-weight: 900; color: #3b82f6; margin: 0; letter-spacing: -1px;">INVOICE</h2>
      <p style="font-size: 14px; font-weight: 600; color: #1e293b; margin-top: 4px;">#{{invoice_number}}</p>
    </div>
  </div>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px;">
    <div>
      <h3 style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: #94a3b8; margin-bottom: 8px;">Bill To</h3>
      <p style="font-size: 14px; font-weight: 600; margin: 0;">{{client_name}}</p>
    </div>
    <div style="text-align: right;">
      <h3 style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: #94a3b8; margin-bottom: 8px;">Date Issued</h3>
      <p style="font-size: 14px; font-weight: 600; margin: 0;">{{date}}</p>
    </div>
  </div>
  <div style="width: 100%; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
    <table style="width: 100%; border-collapse: collapse;">
      <thead style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
        <tr>
          <th style="padding: 12px 16px; text-align: left; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #64748b;">Description</th>
          <th style="padding: 12px 16px; text-align: right; font-size: 11px; font-weight: bold; text-transform: uppercase; color: #64748b; width: 120px;">Amount</th>
        </tr>
      </thead>
      <tbody>
        {{items_table_rows_standard}}
      </tbody>
    </table>
  </div>
  <div style="display: flex; justify-content: flex-end;">
    <div style="width: 280px; background: #0f172a; color: #fff; padding: 20px; border-radius: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 12px; font-weight: 600; opacity: 0.7; text-transform: uppercase;">Total Due</span>
        <span style="font-size: 24px; font-weight: 800;">{{total_amount}}</span>
      </div>
    </div>
  </div>
</div>`,

    'proforma.html': `
<div style="font-family: 'Helvetica', sans-serif; padding: 40px; background: #fff; border: 2px solid #3b82f6; position: relative; min-height: 600px;">
  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); opacity: 0.05; font-size: 100px; font-weight: 900; pointer-events: none; white-space: nowrap; color: #3b82f6;">PROFORMA</div>
  <div style="display: flex; justify-content: space-between; margin-bottom: 40px; position: relative; z-index: 10;">
    <h1 style="font-size: 22px; font-weight: bold; color: #3b82f6; margin: 0;">{{business_name}}</h1>
    <div style="text-align: right;">
      <h2 style="font-size: 24px; font-weight: 900; margin: 0; color: #1e293b;">PROFORMA INVOICE</h2>
      <p style="font-size: 12px; color: #64748b; margin-top: 4px;">For Customs & Internal Review</p>
    </div>
  </div>
  <div style="margin-bottom: 40px; padding: 20px; background: #eff6ff; border-radius: 8px; position: relative; z-index: 10;">
    <p style="font-size: 11px; font-weight: bold; color: #3b82f6; text-transform: uppercase; margin-bottom: 8px;">Expected Billing For:</p>
    <p style="font-size: 16px; font-weight: 600; margin: 0;">{{client_name}}</p>
  </div>
  <div style="margin-bottom: 40px; position: relative; z-index: 10;">
    {{items}}
  </div>
  <div style="border-top: 2px dashed #cbd5e1; padding-top: 20px; text-align: right; position: relative; z-index: 10;">
    <div style="font-size: 12px; color: #64748b; margin-bottom: 4px;">Total Estimated Amount</div>
    <div style="font-size: 28px; font-weight: 900; color: #3b82f6;">{{total_amount}}</div>
  </div>
  <div style="margin-top: 40px; font-size: 11px; color: #94a3b8; font-style: italic; border: 1px solid #e2e8f0; padding: 12px; border-radius: 4px; position: relative; z-index: 10;">
    Note: This is a Proforma Invoice and not a final bill for services rendered. It serves as a quote and commitment to purchase.
  </div>
</div>`,

    'timesheet.html': `
<div style="font-family: 'JetBrains Mono', monospace; padding: 40px; background: #fff; color: #18181b;">
  <div style="display: flex; justify-content: space-between; margin-bottom: 50px;">
    <h1 style="font-size: 18px; font-weight: 800; margin: 0; text-transform: uppercase; border: 2px solid #000; padding: 10px 20px;">{{business_name}}</h1>
    <div style="text-align: right;">
      <h2 style="font-size: 12px; font-weight: 800; text-transform: uppercase; margin: 0;">Service Timesheet Invoice</h2>
      <p style="font-size: 12px; margin-top: 4px;">Date: {{date}}</p>
    </div>
  </div>
  <div style="margin-bottom: 40px;">
    <p style="font-size: 11px; font-weight: 800; text-transform: uppercase; text-decoration: underline;">Billing Summary</p>
    <p style="font-size: 14px; margin-top: 8px;">Invoice: #{{invoice_number}}</p>
    <p style="font-size: 14px;">Client: {{client_name}}</p>
  </div>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 40px;">
    <thead style="border-top: 2px solid #000; border-bottom: 2px solid #000;">
      <tr>
        <th style="padding: 10px; text-align: left; font-size: 12px; text-transform: uppercase;">Service/Task</th>
        <th style="padding: 10px; text-align: right; font-size: 12px; text-transform: uppercase; width: 80px;">Hours</th>
        <th style="padding: 10px; text-align: right; font-size: 12px; text-transform: uppercase; width: 100px;">Rate</th>
        <th style="padding: 10px; text-align: right; font-size: 12px; text-transform: uppercase; width: 120px;">Subtotal</th>
      </tr>
    </thead>
    <tbody>
      {{items_table_rows_timesheet}}
    </tbody>
  </table>
  <div style="display: flex; justify-content: flex-end; border-top: 2px solid #000; padding-top: 20px;">
    <div style="text-align: right;">
      <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; margin-bottom: 4px;">Total Due</div>
      <div style="font-size: 32px; font-weight: 800;">{{total_amount}}</div>
    </div>
  </div>
</div>`,

    'commercial.html': `
<div style="font-family: Arial, sans-serif; padding: 20px; background: #fff; color: #000; border: 1px solid #000; font-size: 9px;">
  <h1 style="text-align: center; font-size: 14px; border-bottom: 1px solid #000; padding-bottom: 8px; margin-bottom: 15px;">COMMERCIAL INVOICE</h1>
  <div style="display: grid; grid-template-columns: 1fr 1fr; border: 1px solid #000; margin-bottom: 15px;">
    <div style="padding: 8px; border-right: 1px solid #000;">
      <p style="font-weight: bold; margin-bottom: 4px; text-decoration: underline;">EXPORTER/CONSIGNOR:</p>
      <p style="margin: 0; font-weight: bold;">{{business_name}}</p>
      <p style="margin: 0;">100 Tech Blvd, Suite 500</p>
      <p style="margin: 0;">San Francisco, CA 94105, USA</p>
    </div>
    <div style="padding: 8px;">
      <p style="font-weight: bold; margin-bottom: 4px; text-decoration: underline;">CONSIGNEE:</p>
      <p style="margin: 0; font-weight: bold;">{{client_name}}</p>
      <p style="margin: 0;">456 Startup Way</p>
      <p style="margin: 0;">Austin, TX 78701, USA</p>
    </div>
  </div>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px; border: 1px solid #000;">
    <thead style="background: #f0f0f0;">
      <tr>
        <th style="border: 1px solid #000; padding: 4px;">Description</th>
        <th style="border: 1px solid #000; padding: 4px;">HS Code</th>
        <th style="border: 1px solid #000; padding: 4px;">Origin</th>
        <th style="border: 1px solid #000; padding: 4px;">Qty</th>
        <th style="border: 1px solid #000; padding: 4px;">Value</th>
      </tr>
    </thead>
    <tbody>
      {{items_table_rows_commercial}}
    </tbody>
  </table>
  <div style="display: flex; justify-content: flex-end;">
    <table style="width: 200px; border-collapse: collapse; border: 1px solid #000;">
      <tr>
        <td style="padding: 6px; font-weight: bold;">TOTAL INVOICE VALUE:</td>
        <td style="padding: 6px; text-align: right; font-weight: bold;">{{total_amount}}</td>
      </tr>
    </table>
  </div>
  <div style="margin-top: 25px;">
    <p>I declare that all the information contained in this invoice to be true and correct.</p>
    <div style="margin-top: 15px; border-bottom: 1px solid #000; width: 150px; height: 30px;"></div>
    <p style="margin-top: 4px;">Authorized Signature</p>
  </div>
</div>`,

    'milestone.html': `
<div style="font-family: 'Open Sans', sans-serif; padding: 40px; background: #fff; color: #334155;">
  <div style="display: flex; justify-content: space-between; border-bottom: 4px solid #3b82f6; padding-bottom: 20px; margin-bottom: 40px;">
    <h1 style="font-size: 24px; font-weight: 800; color: #1e3a8a; margin: 0;">{{business_name}}</h1>
    <div style="text-align: right;">
      <h2 style="font-size: 12px; color: #3b82f6; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Progress Billing</h2>
      <p style="font-size: 18px; font-weight: 800; color: #1e293b; margin-top: 4px;">#{{invoice_number}}</p>
    </div>
  </div>
  <div style="margin-bottom: 40px;">
    <h3 style="font-size: 10px; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">Project Phase</h3>
    <p style="font-size: 18px; font-weight: 700; color: #0f172a; margin: 0;">Current Milestone Delivery</p>
    <p style="font-size: 14px; margin-top: 4px; color: #64748b;">Client: {{client_name}}</p>
  </div>
  <div style="margin-bottom: 40px;">
    {{items}}
  </div>
  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px;">
    <div style="width: 100%; max-width: 350px; margin-left: auto;">
      <div style="display: flex; justify-content: space-between; font-size: 13px; color: #64748b; margin-bottom: 10px;">
        <span>Contract Total:</span>
        <span style="font-weight: 700; color: #1e293b;">$25,000.00</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 13px; color: #64748b; padding-bottom: 10px; border-bottom: 1px solid #e2e8f0; margin-bottom: 10px;">
        <span>Previous Payments:</span>
        <span style="font-weight: 700; color: #1e293b;">$15,000.00</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: 800; color: #1e3a8a;">
        <span>Balance Due:</span>
        <span>{{total_amount}}</span>
      </div>
    </div>
  </div>
</div>`,

    'recurring.html': `
<div style="font-family: 'Inter', sans-serif; padding: 40px; background: #fcfcfc; color: #1f2937; border-top: 6px solid #8b5cf6;">
  <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
    <div>
      <h1 style="font-size: 22px; font-weight: 900; color: #8b5cf6; margin: 0;">{{business_name}}</h1>
      <p style="font-size: 12px; color: #6b7280; font-weight: 600; margin-top: 4px;">Subscription Bill #{{invoice_number}}</p>
    </div>
    <div style="text-align: right;">
      <div style="display: inline-block; background: #8b5cf610; color: #8b5cf6; border: 1px solid #8b5cf630; padding: 4px 12px; border-radius: 20px; font-size: 9px; font-weight: 800; text-transform: uppercase; margin-bottom: 8px;">Auto-Renew Enabled</div>
      <p style="font-size: 14px; font-weight: 700; margin: 0;">{{date}}</p>
    </div>
  </div>
  <div style="background: #fff; border: 1px solid #f3f4f6; border-radius: 12px; padding: 20px; margin-bottom: 40px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div>
      <h3 style="font-size: 9px; text-transform: uppercase; color: #9ca3af; font-weight: 800; margin-bottom: 6px;">Billed To</h3>
      <p style="font-size: 14px; font-weight: 600; margin: 0;">{{client_name}}</p>
    </div>
    <div style="text-align: right;">
      <h3 style="font-size: 9px; text-transform: uppercase; color: #9ca3af; font-weight: 800; margin-bottom: 6px;">Billing Period</h3>
      <p style="font-size: 14px; font-weight: 600; margin: 0;">Cycle: Monthly Renewal</p>
    </div>
  </div>
  <div style="margin-bottom: 40px;">
    <div style="display: flex; padding-bottom: 10px; border-bottom: 1px solid #f3f4f6; margin-bottom: 10px;">
      <div style="flex: 1; font-size: 11px; font-weight: 800; color: #9ca3af; text-transform: uppercase;">Plan Details</div>
      <div style="width: 100px; text-align: right; font-size: 11px; font-weight: 800; color: #9ca3af; text-transform: uppercase;">Amount</div>
    </div>
    {{items}}
  </div>
  <div style="background: #8b5cf605; border: 1px solid #8b5cf610; border-radius: 16px; padding: 24px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <p style="font-size: 11px; color: #8b5cf6; font-weight: 800; margin: 0;">Next Auto-Charge: Next Month</p>
    </div>
    <div style="text-align: right;">
       <p style="font-size: 10px; color: #6b7280; font-weight: 600; margin-bottom: 2px;">Total Paid</p>
       <p style="font-size: 24px; font-weight: 900; color: #1f2937; margin: 0;">{{total_amount}}</p>
    </div>
  </div>
</div>`
};
