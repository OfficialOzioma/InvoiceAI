-- SUPABASE DATABASE SETUP FOR INVOICEAI
-- RUN THIS IN YOUR SUPABASE SQL EDITOR

-- 1. CLIENTS TABLE
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL, -- Links to your auth system
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    tax_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. INVOICES TABLE
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
    invoice_number TEXT NOT NULL,
    status TEXT DEFAULT 'Draft' CHECK (status IN ('Draft', 'Pending', 'Paid', 'Overdue', 'Cancelled')),
    subtotal NUMERIC(12, 2) DEFAULT 0.00,
    tax NUMERIC(12, 2) DEFAULT 0.00,
    total NUMERIC(12, 2) DEFAULT 0.00,
    notes TEXT,
    terms TEXT,
    due_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. LINE ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.line_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity NUMERIC(12, 2) DEFAULT 1,
    price NUMERIC(12, 2) DEFAULT 0,
    amount NUMERIC(12, 2) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BUSINESS SETTINGS
CREATE TABLE IF NOT EXISTS public.business_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE,
    business_name TEXT,
    business_email TEXT,
    business_phone TEXT,
    business_address TEXT,
    logo_url TEXT,
    tax_id TEXT,
    currency TEXT DEFAULT 'USD',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;

-- CREATE POLICIES (Assuming user_id matches Supabase Auth ID)
-- Clients: Owners can do anything
CREATE POLICY "Users can manage their own clients" ON public.clients
    FOR ALL USING (auth.uid() = user_id);

-- Invoices: Owners can do anything
CREATE POLICY "Users can manage their own invoices" ON public.invoices
    FOR ALL USING (auth.uid() = user_id);

-- Line Items: Owners can do anything via Invoice relationship
CREATE POLICY "Users can manage their own line items" ON public.line_items
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.invoices 
            WHERE public.invoices.id = public.line_items.invoice_id 
            AND public.invoices.user_id = auth.uid()
        )
    );

-- Business Settings: Owners can manage
CREATE POLICY "Users can manage their own settings" ON public.business_settings
    FOR ALL USING (auth.uid() = user_id);
-- Also allow reading for public invoice sharing if needed (more advanced)
