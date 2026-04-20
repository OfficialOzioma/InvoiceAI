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
</div>`
};
