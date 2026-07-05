import { useEffect, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { clearAuthSession, getAccessToken, getStoredAuthUser } from "@/lib/authApi";
import { getApiUrl } from "@/lib/apiConfig";

type JwtPayload = {
  sub?: string;
  role?: string;
  exp?: number;
};

type ProtectedRouteProps = {
  allowedRoles: string[];
  verificationPath?: string;
  children: ReactNode;
};

const normalizeRole = (value?: string) => value?.trim().toLowerCase();

const roleDashboard: Record<string, string> = {
  admin: "/admin/dashboard",
  editor: "/editor/dashboard",
  "chief editor": "/chief-editor/dashboard",
  author: "/user/dashboard",
  reviewer: "/reviewer/dashboard",
  "publication team": "/publication/dashboard",
};

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const encoded = token.split(".")[1];
    if (!encoded) return null;
    const padded = encoded.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(encoded.length / 4) * 4, "=");
    const bytes = Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes)) as JwtPayload;
  } catch {
    return null;
  }
}

function validateLocalSession(token: string, allowedRoleKey: string) {
  const user = getStoredAuthUser();
  const payload = decodeJwtPayload(token);
  if (!user || !payload?.exp || !payload.sub || !payload.role) return { status: "invalid" as const };

  const accountRole = normalizeRole(user.role);
  const role =
    accountRole === "editor" && user.redirect_to?.startsWith("/chief-editor/")
      ? "chief editor"
      : accountRole;
  const isValid = Boolean(
    payload.exp * 1000 > Date.now() &&
    payload.sub === String(user.user_id) &&
    normalizeRole(payload.role) === accountRole &&
    normalizeRole(user.status) === "active"
  );

  if (!isValid || !role) return { status: "invalid" as const };
  if (!allowedRoleKey.split(",").includes(role)) return { status: "forbidden" as const, role };
  return { status: "valid" as const, role };
}

const ProtectedRoute = ({ allowedRoles, verificationPath, children }: ProtectedRouteProps) => {
  const location = useLocation();
  const [accessState, setAccessState] = useState<"checking" | "authorized" | "unauthenticated" | "forbidden">("checking");
  const [currentRole, setCurrentRole] = useState("");
  const allowedRoleKey = allowedRoles.map(normalizeRole).sort().join(",");

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      clearAuthSession();
      setAccessState("unauthenticated");
      return;
    }

    const localSession = validateLocalSession(token, allowedRoleKey);
    if (localSession.status === "invalid") {
      clearAuthSession();
      setAccessState("unauthenticated");
      return;
    }
    if (localSession.status === "forbidden") {
      setCurrentRole(localSession.role);
      setAccessState("forbidden");
      return;
    }
    if (!verificationPath) {
      setAccessState("authorized");
      return;
    }

    const controller = new AbortController();
    setAccessState("checking");

    fetch(getApiUrl(verificationPath), {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("Session validation failed.");
        setAccessState("authorized");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        clearAuthSession();
        setAccessState("unauthenticated");
      });

    return () => controller.abort();
  }, [allowedRoleKey, verificationPath]);

  if (accessState === "checking") {
    return <div className="flex min-h-screen items-center justify-center bg-slate-100 text-sm font-semibold text-slate-500">Verifying your session...</div>;
  }

  if (accessState === "unauthenticated") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (accessState === "forbidden") {
    return <Navigate to={roleDashboard[currentRole] ?? "/login"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
