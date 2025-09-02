<template>
    <navbar/>
    <Footer/>
    <!-- <hero v-if="$route.name === 'name'" /> -->
    <!-- <hero v-if="$route.dashboard === 'dashboard'" /> -->
    <router-view></router-view>
</template>

<script>
import navbar from './components/navbar.vue'
// import hero from './components/hero.vue'
import footer from './components/footer.vue'
export default {
    components:{
        navbar,
        footer,
        // hero
    }
}
</script>