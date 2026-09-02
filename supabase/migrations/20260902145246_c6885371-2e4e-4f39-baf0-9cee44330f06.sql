CREATE TABLE public.greetings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  recipient_name TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.greetings TO anon;
GRANT SELECT, INSERT ON public.greetings TO authenticated;
GRANT ALL ON public.greetings TO service_role;
ALTER TABLE public.greetings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read greetings" ON public.greetings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can create greetings" ON public.greetings FOR INSERT TO anon, authenticated WITH CHECK (char_length(recipient_name) BETWEEN 1 AND 80 AND char_length(sender_name) BETWEEN 1 AND 80 AND char_length(slug) BETWEEN 4 AND 40);