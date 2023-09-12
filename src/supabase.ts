import { type RealtimeChannel, createClient } from "@supabase/supabase-js";
import { type Database } from "./types";

export const supabaseClient = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

let supabaseRoom: RealtimeChannel | null = null;

export function getSupabaseRoom() {
  if (supabaseRoom) {
    return supabaseRoom;
  }

  supabaseRoom = supabaseClient.channel("supabase-room", {
    config: {
      broadcast: {
        self: true,
      },
    },
  });

  supabaseRoom.subscribe();
  supabaseRoom.track({});

  return supabaseRoom;
}
