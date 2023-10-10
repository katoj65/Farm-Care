import { createClient } from '@supabase/supabase-js';
export default function database(){
const supabase = createClient('https://xbpzyrldtrvnxwrgkjtt.supabase.co',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhicHp5cmxkdHJ2bnh3cmdranR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3NDU5MTksImV4cCI6MjAxMjMyMTkxOX0.cPnN89Ne9hN_iZ4ClYqFOG_OSwtGToDyJQTLzKWQRqc');
return supabase;

}

