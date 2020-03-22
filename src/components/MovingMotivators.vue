<template>
  <div class="app">
    <div class="controls">
      <h2>Moving Motivators</h2>
    </div>
    <Cards :cards="cards" />
    <div class="footer">
      Built with <a href="https://vuejs.org/" target="_blank">Vue.js</a>
      and ❤️  by <a href="https://github.com/slaweet" target="_blank">slaweet</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Card } from '../types';
import Cards from './Cards.vue';
import cards from '../cards';

@Component({
  components: {
    Cards,
  },
})
export default class MovingMotivators extends Vue {
  private cards:Card[] = [];

  mounted() {
    this.cards = cards;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app {
  margin: 0 auto;
  min-height: 98vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  margin: 0;
}

h2 {
  padding-right: 10px;
}
</style>
