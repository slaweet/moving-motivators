<template>
  <div class="cards">
    <div v-for="card in cards" :key="card.name">
      <span class="card">
        <span class="name">{{card.name}}</span>
        <span class="description">{{card.description}}</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Card } from '../types';

@Component({
  components: {
  },
})
export default class Cards extends Vue {
  @Prop() cards:Card[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cards {
  display: flex;
  align-items: center;
  width: 100%;
  overflow-x: auto;
  padding: 10px;
  box-sizing: border-box;
}

.card {
  display: block;
  width: 150px;
  height: 150px;
  border: 1px solid black;
  border-radius: 3px;
  margin: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.name {
  color: white;
  background: black;
  padding: 10px;
  font-weight: bold;
}

.description {
  font-size: 12px;
}
</style>
