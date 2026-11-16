import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { seo } from "@/components/site/PageHero";
import "@lovable.dev/cloud-auth-js/styles.css";

export const Route = createFileRoute("/auth")({ head: () => seo("Admin Sign In — LockIn Group", "Secure sign-in for LockIn Group administrators."), component: AuthPage });
function AuthPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [recovery, setRecovery] = useState(false);
  useEffect(() => {
    if (window.location.hash.includes("type=recovery")) setRecovery(true);
    const { data: sub } = supabase.auth.onAuthStateChange(e => { if (e === "PASSWORD_RECOVERY") setRecovery(true); });
    void supabase.auth.getUser().then(({ data }) => { setSignedIn(Boolean(data.user)); });
    return () => sub.subscription.unsubscribe();
  }, []);
  async function forgot() {
    if (!email) { setMessage("Enter your email above first."); return; }
    setBusy(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/auth` });
    setBusy(false);
    setMessage(error ? error.message : "Check your email for a link to set a new password.");
  }
  async function setNewPassword(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { setMessage(error.message); return; }
    setRecovery(false); await navigate({ to: "/admin" });
  }
  async function social(provider: "google" | "lovable") {
    setBusy(true); setMessage("");
    try {
      const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: `${window.location.origin}/auth` });
      if (result.error) { setMessage(result.error.message); return; }
      if (!result.redirected) await navigate({ to: "/admin" });
    } catch { setMessage("Sign-in could not be completed. Please try again."); }
    finally { setBusy(false); }
  }
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setMessage("");
    try {
      if (signup) {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin } });
        setMessage(error ? error.message : "Check your email to confirm your account, then sign in here.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setMessage(error.message); else await navigate({ to: "/admin" });
      }
    } catch { setMessage("Sign-in could not be completed. Please try again."); }
    finally { setBusy(false); }
  }
  return <section className="mx-auto max-w-md px-5 pb-24 pt-36"><LockKeyhole className="h-8 w-8 text-primary-glow" /><p className="eyebrow mt-5">LockIn Group</p><h1 className="mt-3 text-3xl font-semibold">Admin sign in</h1>{recovery ? <form onSubmit={setNewPassword} className="mt-8 space-y-5"><label className="block text-sm">New password<input type="password" required minLength={8} autoComplete="new-password" className="mt-2 w-full rounded-md border border-input bg-background px-3 py-3" value={password} onChange={e => setPassword(e.target.value)} /></label><Button type="submit" disabled={busy} className="w-full">Save new password</Button></form> : signedIn ? <div className="mt-8 space-y-4"><Button className="w-full" onClick={() => void navigate({ to: "/admin" })}>Open admin</Button><Button className="w-full" variant="outline" onClick={async () => { await queryClient.cancelQueries(); queryClient.clear(); await supabase.auth.signOut(); setSignedIn(false); await navigate({ to: "/auth", replace: true }); }}>Sign out</Button></div> : <><div className="mt-8 grid gap-3"><Button variant="outline" className="google-auth" disabled={busy} onClick={() => void social("google")}><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>Continue with Google</Button><Button className="lovable-auth-button" disabled={busy} onClick={() => void social("lovable")}>Continue with Lovable</Button></div><form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm">Email<input type="email" required autoComplete="email" className="mt-2 w-full rounded-md border border-input bg-background px-3 py-3" value={email} onChange={e => setEmail(e.target.value)} /></label><label className="block text-sm">Password<input type="password" required minLength={8} autoComplete={signup ? "new-password" : "current-password"} className="mt-2 w-full rounded-md border border-input bg-background px-3 py-3" value={password} onChange={e => setPassword(e.target.value)} /></label><Button type="submit" disabled={busy} className="w-full">{busy ? "Please wait…" : signup ? "Create account" : "Sign in"}</Button></form>{!signup && <Button variant="link" className="mt-4 mr-4 px-0" disabled={busy} onClick={() => void forgot()}>Forgot password?</Button>}<Button variant="link" className="mt-4 px-0" onClick={() => { setSignup(!signup); setMessage(""); }}>{signup ? "Already have an account? Sign in" : "Create an admin account"}</Button></>}{message && <p role="status" className="mt-5 text-sm text-muted-foreground">{message}</p>}</section>;
}