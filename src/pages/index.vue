<template>

  <section class="bg-[url('/img/homebg.jpg')]  bg-no-repeat bg-cover bg-center/center h-screen flex items-center">
    <div class="w-full  h-full flex bg-black/60  ">
      <div class="relative z-1 flex h-full mx-auto px-6 md:px-16 text-white  flex-col md:flex-row items-center gap-10 ">

        <div class="flex-1  pt-15 md:text-left space-y-4 ">
            <h1 class="text-4xl pt-10 md:pt-0  md:text-5xl font-bold">Movies</h1>

            <p class="mt-4 text-justify text-white text-md mb-10 md:text-lg"> 
                Movies move us like nothing else can, 
                whether they’re scary, funny, dramatic, 
                romantic or anywhere in-between. So many 
                titles, so much to experience.
            </p>

            <button type="button"  class="px-7 py-5 font-bold  shadow-md bg-white text-black   rounded-full transition-colors duration-1000 ease-in-out hover:transition  hover:bg-purple-600  hover:text-white   ">
                <router-link to="/signup" @click="closeMenu" class="navbar-link  transition-[1s]  " >Join Now</router-link>
            </button>

        </div>

        <div class="flex-1 md:pt-24   ">
            <figure class="overflow-hidden md:pt-24 ">
                <img src="/img/UIUX2.png" alt="image" 
                class="w-full h-auto object-cover "
              >
            </figure>
        </div>

      </div>

    </div>
  </section>

   <!-- slider sections -->
  <section class="slider relative bg-[#181727] text-white/80 pt-15">
    <div v-if="sliderMovies.length" class="w-full max-w-4xl mx-auto px-4">
      <h1 class="text-xl lg:text-4xl md:text-xl font-bold mb-4 text-center ">ABOUT US</h1>

      <div class="relative overflow-hidden ">
        <div class="flex md:flex-col-2  transition-transform duration-700 ease-in">
          <div
            v-for="(movie, index) in paginatedMovies"
            :key="movie.id || index"
            class="flex-shrink-0 w-1/3 p-2"
          >
            <img
              :src="movie.image"
              class="w-full h-48 object-cover rounded shadow"
            />
            <h3 class="text-center mt-2 text-sm font-semibold truncate">
              {{ movie.title }}
            </h3>
          </div>
        </div>

        <!-- Controls -->
        <button
          @click="prevPage"
          @mouseenter="stopAutoSlide"
          @mouseleave="startAutoSlide"
          class="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
          <span class="cursor-pointer "> &#8592; </span>
        </button>

        <button
          @click="nextPage"
          @mouseenter="stopAutoSlide"
          class="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
        >
        <span class="cursor-pointer "> &#8594; </span>
        </button>
      </div>

      <p class="text-center mt-3 text-lg text-gray-100 ">
        Page {{ currentPage }} / {{ totalPages }}
      </p>
    </div>
  </section>


  <footer class="bg-[#2E2E2E] text-white w-full pt-10 p-5 md:px-15">
    <div class="md:flex md:justify-between text-center gap-4 items-center  ">
      
      <div class="flex justify-center pb-5">
        <h1 class="">
            <router-link to="/">
              <img src="/img/eboylogo2.png" alt="EboyMovie" class="w-[75px] sm:w-[70px]  md:w-[90px]">
            </router-link>
        </h1>
      </div>

      <div class="text-xl pb-5 flex justify-center gap-5 ">
          <span class="rounded-full  bg-black/80 hover:bg-purple-600 p-3 transition duration-300 ">
            <a href="https://github.com/Britinogn" target="_blank" aria-label="GitHub">
              <i class="fa-brands fa-github "></i>
            </a>
          </span>

          <span class="rounded-full  bg-black/80 hover:bg-purple-600 p-3 transition duration-300">
            <a href="https://www.linkedin.com/in/tino-novatech-597090263?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" aria-label="LinkedIn">
              <i class="fa-brands fa-linkedin"></i>
            </a>
          </span>

          <span class="rounded-full bg-black/80 hover:bg-purple-600 p-3 transition duration-300">
            <a href="https://x.com/britinogn?s=21" target="_blank" aria-label="Twitter">
            <i class="fa-brands fa-x-twitter"></i>
            </a>
          </span>
      </div>

      <div class=" ">
        <h1 class="text-sm font-bold md:text-md lg:text-lg">
          &copy; 2025 Eboy Movie Hub. All Rights Reserved.
        </h1>
      </div>

    </div>
  </footer> 

</template>

<script>
import { getUpcomingMovies } from "../services/api";

export default {
  data() {
    return {
      sliderMovies: [], // store all 50+
      loading: false,
      currentPage: 1,
      perPage: 20,
      autoSlide: null,
    };
  },
  computed: {
    totalPages() {
    return Math.ceil(this.sliderMovies.length / this.perPage);
    },
    paginatedMovies() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.sliderMovies.slice(start, start + this.perPage);
    },  
  },
  methods: {
    async fetchMovies() {
      this.loading = true;
      try {
        const res = await getUpcomingMovies();
        // keep ALL 50+ photos
        this.sliderMovies = res.data.movies.flatMap(g => g.list);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    nextPage() {
      this.currentPage =
        this.currentPage < this.totalPages ? this.currentPage + 1 : 1;
    },
    prevPage() {
      this.currentPage =
        this.currentPage > 1 ? this.currentPage - 1 : this.totalPages;
    },

    // startAutoSlide() {
    //   if (this.autoSlide) return;
    //   this.autoSlide = setInterval(this.nextPage, 4000);
    // },
    // stopAutoSlide() {
    //   clearInterval(this.autoSlide);
    //   this.autoSlide = null;
    // },
  },
  mounted() {
    this.fetchMovies();
    // this.startAutoSlide();
  },
//   beforeUnmount() {
//     this.stopAutoSlide();
//   },
};
</script>
