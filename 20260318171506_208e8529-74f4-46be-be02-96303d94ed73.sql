
CREATE POLICY "Admins can view all transactions"
ON public.transactions FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
