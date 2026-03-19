-- Admin can delete profiles
CREATE POLICY "Admins can delete profiles" ON public.profiles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin can delete transactions
CREATE POLICY "Admins can delete all transactions" ON public.transactions FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin can update all transactions
CREATE POLICY "Admins can update all transactions" ON public.transactions FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin can delete subscriptions
CREATE POLICY "Admins can delete subscriptions" ON public.subscriptions FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin can delete user_roles
CREATE POLICY "Admins can delete roles" ON public.user_roles FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin can delete payment_requests
CREATE POLICY "Admins can delete payments" ON public.payment_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin can delete accounts
CREATE POLICY "Admins can delete accounts" ON public.accounts FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin can delete budgets
CREATE POLICY "Admins can delete budgets" ON public.budgets FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin can delete goals
CREATE POLICY "Admins can delete goals" ON public.goals FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin can delete notes
CREATE POLICY "Admins can delete notes" ON public.notes FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin can insert transactions (for balance adjustment)
CREATE POLICY "Admins can insert transactions" ON public.transactions FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));