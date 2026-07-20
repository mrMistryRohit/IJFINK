import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Eye, EyeOff, KeyRound, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { requestPasswordReset, resetPassword as submitPasswordReset, verifyPasswordResetOtp } from "@/lib/authApi";

type RecoveryStep = "email" | "otp" | "reset" | "success";

const routes: Record<RecoveryStep, string> = {
  email: "/forgot-password",
  otp: "/forgot-password/verify",
  reset: "/forgot-password/reset",
  success: "/forgot-password/success",
};

const getStep = (path: string): RecoveryStep => {
  if (path.endsWith("/verify")) return "otp";
  if (path.endsWith("/reset")) return "reset";
  if (path.endsWith("/success")) return "success";
  return "email";
};

const ForgotPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const step = getStep(location.pathname);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (step === "otp" && !email) navigate(routes.email, { replace: true });
    if (step === "reset" && (!email || !resetToken)) navigate(email ? routes.otp : routes.email, { replace: true });
    if (step === "success" && (!email || !resetToken)) navigate(routes.email, { replace: true });
  }, [email, navigate, resetToken, step]);

  const sendOtpRequest = async (nextEmail: string) => {
    const response = await requestPasswordReset(nextEmail);
    setEmail(nextEmail);
    setOtp("");
    setResetToken("");
    toast({ title: "OTP sent", description: response.message ?? "Check your email for the verification code." });
    navigate(routes.otp);
  };

  const sendOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !trimmedEmail.includes("@")) {
      toast({ title: "Enter a valid email", description: "Use the email connected to your account.", variant: "destructive" });
      return;
    }

    setIsSendingOtp(true);
    try {
      await sendOtpRequest(trimmedEmail);
    } catch (error) {
      toast({ title: "Request failed", description: error instanceof Error ? error.message : "Unable to send verification code.", variant: "destructive" });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const resendOtp = async () => {
    if (!email) return;
    setIsSendingOtp(true);
    try {
      await sendOtpRequest(email);
    } catch (error) {
      toast({ title: "Resend failed", description: error instanceof Error ? error.message : "Unable to resend verification code.", variant: "destructive" });
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!otp.trim()) {
      toast({ title: "Enter the OTP", description: "Please type the 6-digit verification code.", variant: "destructive" });
      return;
    }

    setIsVerifyingOtp(true);
    try {
      const response = await verifyPasswordResetOtp(email, otp.trim());
      const token = response.data?.reset_token;
      if (!token) {
        throw new Error("The server did not return a reset token.");
      }
      setResetToken(token);
      toast({ title: "OTP verified", description: response.message ?? "You can now reset your password." });
      navigate(routes.reset);
    } catch (error) {
      toast({ title: "Verification failed", description: error instanceof Error ? error.message : "Unable to verify OTP.", variant: "destructive" });
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const resetPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.length < 8) {
      toast({ title: "Password is too short", description: "Use at least 8 characters.", variant: "destructive" });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match", description: "Enter the same password in both fields.", variant: "destructive" });
      return;
    }
    if (!resetToken) {
      toast({ title: "Session expired", description: "Please verify your OTP again.", variant: "destructive" });
      navigate(routes.email, { replace: true });
      return;
    }

    setIsResetting(true);
    try {
      const response = await submitPasswordReset(email, resetToken, password, confirmPassword);
      toast({ title: "Password reset complete", description: response.message ?? "You can now sign in with your new password." });
      navigate(routes.success);
    } catch (error) {
      toast({ title: "Reset failed", description: error instanceof Error ? error.message : "Unable to reset the password.", variant: "destructive" });
    } finally {
      setIsResetting(false);
    }
  };

  const finishReset = () => {
    setEmail("");
    setOtp("");
    setPassword("");
    setConfirmPassword("");
    setResetToken("");
    navigate("/login", { replace: true });
  };

  const stepNumber = { email: 1, otp: 2, reset: 3, success: 4 }[step];
  const isBusy = isSendingOtp || isVerifyingOtp || isResetting;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[hsl(220,55%,10%)] via-[hsl(220,48%,13%)] to-[hsl(168,55%,14%)] px-4 py-10">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <section className="relative z-10 w-full max-w-xl rounded-2xl border border-white/20 bg-white p-6 shadow-2xl shadow-slate-950/30 md:p-8">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Account Recovery</p>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-950 md:text-3xl">Reset Your Password</h1>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><KeyRound size={22} /></span>
        </div>

        <div className="mb-7 grid grid-cols-4 gap-2">
          {["Email", "OTP", "Password", "Done"].map((label, index) => (
            <div key={label}>
              <div className={"h-1.5 rounded-full " + (index + 1 <= stepNumber ? "bg-primary" : "bg-slate-200")} />
              <p className={"mt-2 text-center text-[11px] font-bold " + (index + 1 <= stepNumber ? "text-primary" : "text-slate-400")}>{label}</p>
            </div>
          ))}
        </div>

        {step === "email" && (
          <form onSubmit={sendOtp}>
            <p className="mb-5 text-sm leading-6 text-slate-500">Enter your registered email address and we will send a verification code.</p>
            <label htmlFor="recovery-email" className="mb-2 block text-sm font-bold text-slate-700">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input id="recovery-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@institution.edu" className="h-14 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" autoFocus />
            </div>
            <button type="submit" disabled={isBusy} className="mt-5 w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60">{isSendingOtp ? "Sending OTP..." : "Send OTP"}</button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={verifyOtp}>
            <p className="text-sm leading-6 text-slate-500">Enter the six-digit code sent to <strong className="text-slate-800">{email}</strong>.</p>
            <label htmlFor="recovery-otp" className="mb-2 mt-5 block text-sm font-bold text-slate-700">Verification Code</label>
            <div className="relative">
              <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input id="recovery-otp" type="text" inputMode="numeric" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/[^0-9]/g, ""))} placeholder="Enter 6-digit OTP" className="h-14 w-full rounded-xl border border-slate-200 pl-11 pr-4 text-center font-mono text-lg tracking-[0.25em] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" autoFocus />
            </div>
            <button type="submit" disabled={isBusy} className="mt-5 w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60">{isVerifyingOtp ? "Verifying..." : "Verify OTP"}</button>
            <button type="button" onClick={() => void resendOtp()} disabled={isBusy} className="mt-3 w-full text-sm font-bold text-primary hover:text-primary/80 disabled:cursor-not-allowed disabled:opacity-60">{isSendingOtp ? "Resending..." : "Resend OTP"}</button>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={resetPassword} className="space-y-4">
            <p className="text-sm leading-6 text-slate-500">Create a new password with at least eight characters.</p>
            <PasswordField label="New Password" value={password} onChange={setPassword} visible={showPassword} onToggle={() => setShowPassword((value) => !value)} />
            <PasswordField label="Confirm Password" value={confirmPassword} onChange={setConfirmPassword} visible={showConfirmPassword} onToggle={() => setShowConfirmPassword((value) => !value)} />
            <button type="submit" disabled={isBusy} className="w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60">{isResetting ? "Resetting..." : "Reset Password"}</button>
          </form>
        )}

        {step === "success" && (
          <div className="py-4 text-center">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><CheckCircle2 size={38} /></span>
            <h2 className="mt-5 text-2xl font-extrabold text-slate-950">Password Reset Complete</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Your password was updated successfully. You can now return to sign in.</p>
            <button type="button" onClick={finishReset} className="mt-6 w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white hover:bg-primary/90">Back to Login</button>
          </div>
        )}

        {step !== "success" && <p className="mt-6 text-center text-sm text-slate-500">Remembered your password? <Link to="/login" className="font-bold text-primary">Back to login</Link></p>}
      </section>
    </main>
  );
};

type PasswordFieldProps = { label: string; value: string; onChange: (value: string) => void; visible: boolean; onToggle: () => void };

const PasswordField = ({ label, value, onChange, visible, onToggle }: PasswordFieldProps) => (
  <div>
    <label className="mb-2 block text-sm font-bold text-slate-700">{label}</label>
    <div className="relative">
      <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
      <input type={visible ? "text" : "password"} value={value} onChange={(event) => onChange(event.target.value)} placeholder={label} className="h-14 w-full rounded-xl border border-slate-200 pl-11 pr-11 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
      <button type="button" onClick={onToggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary" aria-label={visible ? "Hide password" : "Show password"}>
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>
);

export default ForgotPassword;
