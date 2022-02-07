<template>
  <main>
    <px-header />
    <!-- 
      Me permite establecer cuál es el codigo
      que se va a reemplazar a medida que cambie la ruta
      -->
    <router-view />
  </main>
</template>

<script>
import PxHeader from "@/components/PxHeader";
export default {
  name: "App",
  components: {
    PxHeader,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
