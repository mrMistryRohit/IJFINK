import { getApiUrl } from "@/lib/apiConfig";

type HealthResponse = {
  success?: boolean;
};

export async function checkApiHealth() {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(getApiUrl("/health"), {
      method: "GET",
      signal: controller.signal,
      cache: "no-store",
    });
    const data = (await response.json().catch(() => null)) as HealthResponse | null;
    return response.ok && data?.success === true;
  } catch {
    return false;
  } finally {
    window.clearTimeout(timeoutId);
  }
}
