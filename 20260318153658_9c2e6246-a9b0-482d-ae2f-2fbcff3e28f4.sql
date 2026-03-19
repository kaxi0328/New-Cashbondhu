
DROP POLICY "Users can view own accounts" ON public.accounts;
DROP POLICY "Users can insert own accounts" ON public.accounts;
DROP POLICY "Users can update own accounts" ON public.accounts;
DROP POLICY "Users can delete own accounts" ON public.accounts;

CREATE POLICY "Users can view own accounts" ON public.accounts FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own accounts" ON public.accounts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own accounts" ON public.accounts FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own accounts" ON public.accounts FOR DELETE TO authenticated USING (auth.uid() = user_id);
