document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('itemsContainer');
    const addItemBtn = document.getElementById('addItem');

    let items = [];

    // Check for AI Draft in URL
    const urlParams = new URLSearchParams(window.location.search);
    const draftParam = urlParams.get('draft');
    if (draftParam) {
        try {
            const draft = JSON.parse(atob(draftParam));
            if (draft) {
                document.getElementById('invoiceNumber').value = draft.invoiceNumber || document.getElementById('invoiceNumber').value;
                items = draft.items || [];
                // Maybe pre-fill client if useful, but requires ID mapping usually
                if (draft.notes) {
                    const ta = document.querySelector('textarea');
                    if(ta) ta.value = draft.notes;
                }
            }
        } catch (e) {
            console.error("Failed to parse draft", e);
        }
    }

    function renderItems() {
        itemsContainer.innerHTML = '';
        items.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'grid grid-cols-12 gap-3 items-start group';
            row.innerHTML = `
                <div class="col-span-6">
                    <input class="w-full bg-slate-50 border border-border rounded-lg px-4 py-3 text-sm outline-none focus:bg-white focus:border-primary transition-all item-desc" placeholder="Description" value="${item.description}">
                </div>
                <div class="col-span-2">
                    <input type="number" class="w-full bg-slate-50 border border-border rounded-lg px-4 py-3 text-sm text-center outline-none focus:bg-white focus:border-primary transition-all item-qty" placeholder="Qty" value="${item.quantity}">
                </div>
                <div class="col-span-3">
                    <input type="number" class="w-full bg-slate-50 border border-border rounded-lg px-4 py-3 text-sm text-right outline-none focus:bg-white focus:border-primary transition-all item-price" placeholder="Price" value="${item.unitPrice}">
                </div>
                <div class="col-span-1 pt-3">
                    <button class="text-slate-300 hover:text-red-500 transition-colors remove-item" data-index="${index}">
                        <i data-lucide="trash-2" class="w-4.5 h-4.5"></i>
                    </button>
                </div>
            `;
            itemsContainer.appendChild(row);
        });
        lucide.createIcons();
        calculateTotals();
    }

    function calculateTotals() {
        let subtotal = 0;
        const qtyInputs = document.querySelectorAll('.item-qty');
        const priceInputs = document.querySelectorAll('.item-price');
        
        qtyInputs.forEach((input, index) => {
            const qty = parseFloat(input.value) || 0;
            const price = parseFloat(priceInputs[index].value) || 0;
            subtotal += qty * price;
        });

        const tax = subtotal * 0.1;
        const total = subtotal + tax;

        document.getElementById('subtotalDisplay').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('taxDisplay').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('totalDisplay').textContent = `$${total.toFixed(2)}`;
    }

    addItemBtn.addEventListener('click', () => {
        items.push({ description: '', quantity: 1, unitPrice: 0 });
        renderItems();
    });

    itemsContainer.addEventListener('input', () => {
        calculateTotals();
    });

    itemsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.remove-item');
        if (btn) {
            const index = btn.dataset.index;
            items.splice(index, 1);
            renderItems();
        }
    });

    const saveInvoiceBtn = document.getElementById('saveInvoice');
    const saveInvoiceBottomBtn = document.getElementById('saveInvoiceBottom');
    const clientIdSelect = document.getElementById('clientId');

    if (clientIdSelect) {
        clientIdSelect.addEventListener('change', (e) => {
            if (e.target.value === 'new') {
                const newClientName = prompt("Enter new client name:");
                if (newClientName && newClientName.trim()) {
                    const newId = `new_${Date.now()}`;
                    const opt = document.createElement('option');
                    opt.value = newId;
                    opt.textContent = newClientName;
                    clientIdSelect.insertBefore(opt, clientIdSelect.options[2]); // Insert after "new"
                    clientIdSelect.value = newId;
                } else {
                    clientIdSelect.value = ""; // reset if cancelled
                }
            }
        });
    }

    async function handleSaveInvoice() {
        const invoiceData = {
            invoiceNumber: document.getElementById('invoiceNumber').value,
            clientId: document.getElementById('clientId').value,
            clientName: document.getElementById('clientId').options[document.getElementById('clientId').selectedIndex]?.text || 'Acme Corp',
            issueDate: document.querySelectorAll('input[type="date"]')[0].value,
            dueDate: document.querySelectorAll('input[type="date"]')[1].value,
            items: items.map((_, i) => ({
                description: document.querySelectorAll('.item-desc')[i].value,
                quantity: parseFloat(document.querySelectorAll('.item-qty')[i].value) || 0,
                price: parseFloat(document.querySelectorAll('.item-price')[i].value) || 0
            })),
            notes: document.querySelector('textarea')?.value || ''
        };

        try {
            // Placeholder: we'd post this to the backend
            // const res = await fetch('/invoices', { method: 'POST', body: JSON.stringify(invoiceData), headers: {'Content-Type': 'application/json'} });
            alert('Invoice Created Successfully!');
            window.location.href = '/invoices';
        } catch (e) {
            console.error("Save error", e);
            alert("Error saving invoice.");
        }
    }

    if(saveInvoiceBtn) saveInvoiceBtn.addEventListener('click', handleSaveInvoice);
    if(saveInvoiceBottomBtn) saveInvoiceBottomBtn.addEventListener('click', handleSaveInvoice);

    // Initial row
    if (window.INVOICE_EDIT_DATA) {
        const data = window.INVOICE_EDIT_DATA;
        document.getElementById('invoiceNumber').value = data.invoiceNumber || '';
        
        // Add option if not exists to avoid empty dropdown
        if (data.clientName && data.clientId) {
           let exists = Array.from(clientIdSelect.options).some(o => o.text === data.clientName);
           if (!exists) {
               const o = document.createElement('option');
               o.value = data.clientId;
               o.textContent = data.clientName;
               clientIdSelect.appendChild(o);
           }
           clientIdSelect.value = data.clientId;
        }

        if (data.createdAt) document.querySelectorAll('input[type="date"]')[0].value = data.createdAt.split('T')[0];
        if (data.dueDate) document.querySelectorAll('input[type="date"]')[1].value = data.dueDate.split('T')[0];
        
        if (data.notes) {
            const ta = document.querySelector('textarea');
            if(ta) ta.value = data.notes;
        }

        if (data.lineItems && data.lineItems.length > 0) {
            items = data.lineItems.map(li => ({
                description: li.description || '',
                quantity: parseFloat(li.quantity) || 1,
                unitPrice: typeof li.price === 'string' ? parseFloat(li.price.replace(/,/g, '')) : (parseFloat(li.price) || 0)
            }));
            renderItems();
        } else {
            addItemBtn.click();
        }
    } else {
        addItemBtn.click();
    }
});
