import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pzufhggexvefsfwooclp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6dWZoZ2dleHZlZnNmd29vY2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0MDI0NDksImV4cCI6MjAzMjk3ODQ0OX0.PWIY2H6GgqRH6wWVOnmqTAWhuFyY-pdmRUw94qQCus8";
const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
