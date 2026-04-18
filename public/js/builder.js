document.addEventListener('DOMContentLoaded', () => {
    const itemsContainer = document.getElementById('itemsContainer');
    const addItemBtn = document.getElementById('addItem');
    const generateAiBtn = document.getElementById('generateAi');
    const aiPromptInput = document.getElementById('aiPrompt');

    let items = [];

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

    generateAiBtn.addEventListener('click', async () => {
        const prompt = aiPromptInput.value;
        if (!prompt) return;

        generateAiBtn.disabled = true;
        try {
            const res = await fetch('/invoices/ai-draft', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt })
            });
            const draft = await res.json();
            if (draft) {
                document.getElementById('invoiceNumber').value = draft.invoiceNumber;
                items = draft.items;
                renderItems();
            }
        } catch (error) {
            console.error(error);
        }
        generateAiBtn.disabled = false;
    });

    // Initial row
    addItemBtn.click();
});
