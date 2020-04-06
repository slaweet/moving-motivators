<template>
  <div class="app">
    <div class="controls">
      <h2>Moving Motivators</h2>
      <a href="https://management30.com/practice/moving-motivators/" target="_blank">Learn more</a>
    </div>
    <Cards :cards="cards" @cardDrop="handleCardDrop" />
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
    this.cards = cards.map((card) => ({
      ...card,
      rate: 0,
    }));
  }

  handleCardDrop({ draggedCard, dropSlot, rate }:{
    draggedCard: string, dropSlot: string, rate: number
  }) {
    const newCards = [...this.cards];
    const draggedIndex = newCards.findIndex(({ name }) => name === draggedCard);
    const dropIndex = newCards.findIndex(({ name }) => name === dropSlot);
    newCards.splice(draggedIndex, 1);
    this.cards[draggedIndex].rate = rate;
    newCards.splice(dropIndex, 0, this.cards[draggedIndex]);
    this.cards = newCards;
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
