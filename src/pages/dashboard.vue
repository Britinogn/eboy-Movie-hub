<template>
            <!-- g-[#181727] text-white  -->
    <section class="bg-[#181727] text-white ">

      <div v-if="loading" class="text-white  text-2xl 
        text-center w-75 items-center flex justify-center py-10 px-10 bg-cyan-950">
        <i class="fa-solid fa-spinner animate-spin "></i>
      </div>

      <!-- <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-10">
        <div v-for="n in 8" :key="n" class="bg-white/10 p-4 rounded-lg animate-pulse">
          <div class="w-32 h-48 bg-white/20 rounded mb-3 mx-auto"></div>
          <div class="h-4 bg-white/20 rounded w-24 mx-auto mb-2"></div>
          <div class="h-3 bg-white/10 rounded w-16 mx-auto"></div>
        </div>
      </div> -->


      <div v-else class="">
        <h1 class="text-2xl lg:text-4xl md:py-34 font-bold py-28 text-center uppercase md:pt-60  ">Upcoming-Movies</h1>

        <div 
          v-for="(group, gIndex) in movieGroups" 
          :key="gIndex" 
          class="mb-10"
          >
          <!-- Date heading -->
          <h2 class="text-xl font-bold mb-4 text-center">{{ group.date }}</h2>

              <!-- Movies for this date -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-5 mx-10">
            <div 
              v-for="(movie, mIndex) in group.list" 
              :key="mIndex" 
              class="bg-white/20 shadow p-4 text- rounded-lg flex flex-col items-center"
              >
              <img 
                  :src="movie.image" 
                  alt="poster" 
                  class="w-32 h-48 object-cover rounded mb-3"
              />
              <h3 class="text-lg font-semibold text-center">{{ movie.title }}</h3>
              <p class="text-gray-500">{{ movie.categories.join(', ') }}</p>
            </div>
          </div>
          
        </div>
      </div>
    </section>

</template>


<script>
import { getUpcomingMovies } from "../services/api";

export default {
  data() {
    return {
      movieGroups: [],
      loading: false,
    };
  },
  methods: {
    async fetchMovies() {
      if (this.movieGroups.length) return;
      this.loading = true;
      try {
        const res = await getUpcomingMovies();
        this.movieGroups = res.data.movies; // keep groups with date + list
        this.$toast?.success?.("Movies fetched successfully!");
      } catch (error) {
        console.log(error);
        this.$toast?.error?.("Failed to fetch Movies.");
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    const cached = localStorage.getItem("movies");
    if (cached) {
      this.movieGroups = JSON.parse(cached);
    } else {
      this.fetchMovies();
    }
  },
};
</script>


