import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import supabase from "@/services/supabase";

type InviteStatus = "verifying" | "ready" | "invalid" | "saving";

function AcceptInvite() {
  const navigate = useNavigate();
  const verificationStarted = useRef(false);
  const [status, setStatus] = useState<InviteStatus>("verifying");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (verificationStarted.current) return;
    verificationStarted.current = true;

    const params = new URLSearchParams(window.location.search);
    const tokenHash = params.get("token_hash");
    const type = params.get("type");
    window.history.replaceState({}, "", window.location.pathname);

    if (!tokenHash || type !== "invite") {
      setMessage(
        "This invitation link is invalid. Ask an admin for a new one.",
      );
      setStatus("invalid");
      return;
    }

    async function verifyInvitation() {
      try {
        const { error } = await supabase.auth.verifyOtp({
          token_hash: tokenHash!,
          type: "invite",
        });
        if (error) throw error;
        setStatus("ready");
      } catch {
        setMessage(
          "This invitation link has expired or was already used. Ask an admin for a new one.",
        );
        setStatus("invalid");
      }
    }
    void verifyInvitation();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8) {
      setMessage("Use a password with at least 8 characters.");
      return;
    }
    if (password !== confirmation) {
      setMessage("The passwords do not match.");
      return;
    }

    setStatus("saving");
    setMessage("");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage(error.message);
      setStatus("ready");
      return;
    }

    await supabase.auth.signOut();
    navigate("/login", { replace: true, state: { inviteAccepted: true } });
  }

  return (
    <div className="max-w-md mx-auto mt-16 space-y-6 text-left">
      <Heading as="h2">Accept your invitation</Heading>
      {status === "verifying" && <p>Checking your invitation…</p>}
      {status === "invalid" && <p role="alert">{message}</p>}
      {(status === "ready" || status === "saving") && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p>Choose a password for your Coachify account.</p>
          <label className="block space-y-2">
            <span>Password</span>
            <Input
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={status === "saving"}
            />
          </label>
          <label className="block space-y-2">
            <span>Confirm password</span>
            <Input
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              disabled={status === "saving"}
            />
          </label>
          {message && <p role="alert">{message}</p>}
          <Button type="submit" disabled={status === "saving"}>
            {status === "saving" ? "Saving…" : "Set password"}
          </Button>
        </form>
      )}
    </div>
  );
}

export default AcceptInvite;
