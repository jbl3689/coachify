// This controls the public UI only. Disable signups in Supabase Auth as well
// before exposing a deployment that must reject account creation.
export const publicSignupEnabled =
  import.meta.env.VITE_ENABLE_PUBLIC_SIGNUP === "true";
