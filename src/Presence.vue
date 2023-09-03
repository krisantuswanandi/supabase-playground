<script setup lang="ts">
import { ref } from "vue";
import { getSupabaseRoom } from "./supabase";

const users = ref<string[]>([]);

const supabaseRoom = getSupabaseRoom();

supabaseRoom.on("presence", { event: "sync" }, () => {
  const keys = Object.keys(supabaseRoom.presenceState());
  users.value = keys;
});
</script>

<template>
  <section>
    <h2>Presence</h2>
    <div class="messages-title">Users:</div>
    <ul class="messages-body">
      <li v-for="u in users" :key="u">{{ u }}</li>
    </ul>
  </section>
</template>

<style scoped>
.messages-title {
  margin-top: 1rem;
}

.messages-body {
  opacity: 0.6;
}
</style>
