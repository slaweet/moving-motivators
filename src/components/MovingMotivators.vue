<template>
  <div class="app">
    <div class="controls">
      <h1>Moving Motivators</h1>
      <a href="https://management30.com/practice/moving-motivators/" target="_blank">Learn more</a>
    </div>
    <Cards :cards="cards" @cardDrop="handleCardDrop" />
    <div class="footer">
      <span class="importance">
        ⬅️  Least important
      </span>
      <span>
        Built with <a href="https://vuejs.org/" target="_blank">Vue.js</a>
        and ❤️  by <a href="https://github.com/slaweet" target="_blank">slaweet</a>
      </span>
      <span class="importance">
        Most important ➡️
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Card, Rate } from '../types';
import Cards from './Cards.vue';
import { getCardsFromURL, setCardsInURL } from '../utils';

@Component({
  components: {
    Cards,
  },
})

export default class MovingMotivators extends Vue {
  private cards:Card[] = [];

  mounted() {
    this.cards = getCardsFromURL();
  }

  handleCardDrop({ draggedCard, dropSlot, rate }:{
    draggedCard: string, dropSlot: string, rate: Rate
  }) {
    const newCards = [...this.cards];
    const draggedIndex = newCards.findIndex(({ name }) => name === draggedCard);
    const dropIndex = newCards.findIndex(({ name }) => name === dropSlot);
    newCards.splice(draggedIndex, 1);
    this.cards[draggedIndex].rate = rate;
    newCards.splice(dropIndex, 0, this.cards[draggedIndex]);
    this.cards = newCards;

    setCardsInURL(this.cards);
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
  padding-right: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  width: 100%;

  & .importance {
    font-style: italic;
    color: #444;
  }
}
</style>
