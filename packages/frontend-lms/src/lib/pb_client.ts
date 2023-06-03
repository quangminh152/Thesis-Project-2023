import { useRouter } from "next/router";
import PocketBase from "pocketbase";
import type { UsersResponse } from "server-lms";
import { useMemo } from "react";
import { env } from "src/env/client.mjs";
import type { PBCustom } from "src/types/pb-custom";

export function usePBClient(pbAuthCookie: string): {
  pbClient: PBCustom;
  user: UsersResponse;
} {
  const router = useRouter();

  const pbClient = useMemo(() => {
    const pb = new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL) as PBCustom;

    // load the store data from the request cookie string
    pb.authStore.loadFromCookie(pbAuthCookie);

    return pb;
  }, [pbAuthCookie]);

  // Must have been authenticated by middleware by now
  const user = pbClient.authStore.model as unknown as UsersResponse | undefined;

  if (!user) {
    router.push("/internalServerError");
    throw new Error("500 - Unauthenticated user must have been redirect");
  }

  return { pbClient, user };
}

export function _middlewarePBClient(pbAuthCookie: string): {
  pbClient: PBCustom;
  user: UsersResponse | undefined;
} {
  // Information Logging if a new client is initialized

  const pbClient = new PocketBase(env.NEXT_PUBLIC_POCKETBASE_URL) as PBCustom;

  // load the store data from the request cookie string
  pbClient.authStore.loadFromCookie(pbAuthCookie);

  const user = pbClient.authStore.model as unknown as UsersResponse | undefined;

  return { pbClient, user };
}
