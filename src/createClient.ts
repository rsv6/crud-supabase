import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
"https://uynscogmlqinalfmodoh.supabase.co",     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5bnNjb2dtbHFpbmFsZm1vZG9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcyMDY3ODIsImV4cCI6MjAzMjc4Mjc4Mn0.kq8juWV5KnYbyfo1yKyAdurSMlc-TzYhzyiRzk1FRr0"
);