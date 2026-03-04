import {
  createBrowserClient as dbBrowserClient,
  createServerClient as dbServerClient,
  createAdminClient,
} from "@musekit/database";
import type { CookieStore } from "@musekit/database";

export function createBrowserClient() {
  return dbBrowserClient();
}

export function createServerClient(cookieStore: CookieStore) {
  return dbServerClient(cookieStore);
}

export { createAdminClient };
export type { CookieStore };
