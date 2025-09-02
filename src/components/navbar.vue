<script setup>
import { ref , onMounted, onUnmounted } from "vue";

const isActive = ref(false);

function toggleMenu() {
  isActive.value = !isActive.value;
}

function closeMenu() {
  isActive.value = false;
}


const isScrolled = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY >= 100;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const header = document.querySelector("[data-header]"); 
const backTopBtn = document.querySelector("[data-back-top-btn]"); 

window.addEventListener("scroll", function() {
  if (window.scrollY >=100) {
  header.classList.add("active"); 
  backTopBtn.classList.add("active"); 
}else{ 
  header.classList.remove("active"); 
  backTopBtn.classList.remove("active"); 
}
}); 

// export default{
//     computed:{
//         isLoggedin(){
//             //check if the user  is logged In
//             return !! localStorage.getItem('token');
//         }
//     },

//     methods: {
//         logout(){
//             // Remove the token from localStorage to log out the user
//             localStorage.removeItem('token');
//             return !! localStorage.removeItem('token');
//             this.$router.push('/login')
//         }
//     },
// }


</script>

<template >
  <header data-header
      :class="{ active: isScrolled }" class="absolute top-0 left-0 w-full md:pb-5 border-b border-green-700 z-[4]">
    <div class="flex justify-between items-center">
      <h1 class=" ">
        <router-link to="/">
          <img src="/img/eboylogo2.png" alt="EboyMovie" class="w-[55px] sm:w-[70px]  md:w-[90px]">
        </router-link>
      </h1>

      <nav :class="['navbar','md:[&.active]:h-[0]', '[&.active]:h-[236px] [&.active]:visible', { active: isActive }] " 
        class="absolute  top-full left-2/4 translate-x-[-50%]  w-[calc(100%-30px)] bg-[#181727] md:bg-transparent
              shadow-md md:shadow-none  overflow-hidden transition-all p-5     invisible  md:relative md:visible md:overflow-visible ">

        <ul class="navbar-list md:text-xl lg:text-2xl font-bold md:flex items-center md:justify-self-end md:space-x-20   lg:space-x-20 text-white ">
          
          <li class="nav-item ">
              <router-link to="/" @click="closeMenu" class="navbar-link transition-[1s]  hover:text-purple-500   ">Home</router-link>
          </li>

          <li class="nav-item ">
          <router-link to="/" @click="closeMenu" class="navbar-link transition-[1s]  hover:text-purple-500   "> About</router-link>

          </li>

          <li class="nav-item">
              <button type="button" class="lg:mx-5 lg:px-0 md:px-5 md:py-5 shadow-md bg-white  text-black  
                    rounded-full bg-amber-60 transition-colors duration-1000 ease-in-out hover:transition-colors 
                    hover:bg-purple-600  hover:text-white hover:duration-1000 py-5 px-5  ">
                <router-link to="/signin" @click="closeMenu" class="navbar-link  transition-[1s] lg:px-15 ">SignIn</router-link>
              </button>     
          </li>

        </ul>

      </nav>
            
      <div class="btn flex items-center gap-5 ">
          <!-- <button class="search-btn text-black/40 text-xl">
              <i class="fa-solid fa-magnifying-glass"></i>
              Find Movies & TV
          </button> -->

          <button class="nav-toggle-btn" :class="{ active: isActive }" @click="toggleMenu" type="button">
              <span class="line top"></span>
              <span class="line middle"></span>
              <span class="line bottom"></span>
          </button>
      </div>
    </div>
  </header>


  

</template>

<style>
.nav-toggle-btn {
  display: grid;
  gap: 4px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}

.line {
  width: 10px;
  height: 3px;
  background-color: rgb(125, 189, 125);
  border-radius: 5px;
  transition: 0.25s ease;
}

.line.middle {
  width: 20px;
}

.line.bottom {
  margin-left: auto;
}

.nav-toggle-btn.active .line.top {
  transform: translate(1px, 3px) rotate(45deg);
}

.nav-toggle-btn.active .line.middle {
  transform: rotate(-45deg);
}

.nav-toggle-btn.active .line.bottom {
  transform: translate(-1px, -3px) rotate(45deg);
}

/* Show/hide navbar for mobile */
.navbar {
  display: none;
}
.navbar.active {
  display: block;

}

@media (min-width: 780px) {

}


/* nav{
    height: 236px;
    visibility: visible;
} */

.nav-item:not(:last-child){
  border-block-end: 1px solid hsla(0, 47%, 66%, 0.04);
}

@media (min-width: 768px) {
  .navbar {
    display: block !important;
  }
  .nav-toggle-btn {
    display: none;
  }
}

/* .header.active {
  color: black/6;
  position: sticky;
  top: -130px;
  background-color: white;
  animation: slideIn 0.5s ease-out forwards;
  box-shadow: 0 1px 4px hsla(0, 0%, 0%, 0.2);
}

@keyframes slideIn {
    0% {
        transform: translateY();
    }
    100%{
        transform: translateY(100%);
    }
} */
</style>