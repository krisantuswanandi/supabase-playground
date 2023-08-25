<script setup lang="ts">
import { onMounted, ref } from "vue";
import { supabaseClient } from "./supabase";

interface Movie {
  id: number;
  name: string;
  data: any;
  created_at: string;
}

const movies = ref<Movie[]>([]);

onMounted(async () => {
  const { data } = await supabaseClient.from("movies").select();
  
  if (data) {
    movies.value = data;
  }
});
</script>

<template>
  <section>
    <h2>Database</h2>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <a :href="movie.data.netflix_url" target="_blank">
          {{ movie.name }}
        </a>
      </li>
    </ul>
  </section>
</template>
