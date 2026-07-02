export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL ?? "https://api.ijfink.com";

export const normalizeBaseUrl = (value: string) => value.replace(/\/$/, "");

export const getApiUrl = (path: string) => `${normalizeBaseUrl(API_BASE_URL)}${path}`;
