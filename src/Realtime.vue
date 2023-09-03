<script setup lang="ts">
import { ref } from "vue";
import { getSupabaseRoom } from "./supabase";

const messages = ref<string[]>([]);

const supabaseRoom = getSupabaseRoom();

supabaseRoom.on("broadcast", { event: "chat" }, (payload) => {
  messages.value.push(payload.message);
});

function sendMessage() {
  supabaseRoom.send({
    type: "broadcast",
    event: "chat",
    message: new Date().toISOString(),
  });
}
</script>

<template>
  <section>
    <h2>Realtime</h2>
    <button @click="sendMessage">Send</button>
    <div class="messages-title">Messages:</div>
    <ul class="messages-body">
      <li v-for="m in messages" :key="m">{{ m }}</li>
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
