import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getGuestMode } from "@/demo/session";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

let liveClient: SupabaseClient | undefined;
const guestClient = createClient(
  `${window.location.origin}/__demo_supabase`,
  "guest-demo-no-auth",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: { headers: { Authorization: "Bearer guest-demo-token" } },
  },
);

function getClient() {
  if (getGuestMode()) return guestClient;
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing SUPABASE_KEY or SUPABASE_URL environment variable",
    );
  }
  liveClient ??= createClient(supabaseUrl, supabaseKey);
  return liveClient;
}

// Service modules keep their existing Supabase call paths. The active client
// is selected at request construction time, after MSW is ready in guest mode.
const supabase = new Proxy({} as SupabaseClient, {
  get(_target, property) {
    const client = getClient();
    const value = Reflect.get(client, property, client);
    if (typeof value === "function") return value.bind(client);
    if (property === "auth" && value) {
      return new Proxy(value, {
        get(auth, authProperty) {
          const method = Reflect.get(auth, authProperty, auth);
          return typeof method === "function" ? method.bind(auth) : method;
        },
      });
    }
    return value;
  },
});

export default supabase;
