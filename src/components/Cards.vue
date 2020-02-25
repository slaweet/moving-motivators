<template>
  <div class="cards">
    <div v-for="card in cards" :key="card.name">
      <span class="card">
        <span class="name" :style="{'background': card.color}">{{card.name}}</span>
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
  box-sizing: border-box;
}

.card {
  display: block;
  width: 165px;
  height: 165px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow:rgba(6, 6, 6, 0.06) 0px 2px 4px 0px;
  cursor: pointer;
}

.name {
  color: white;
  background: #cccccc;
  padding: 5px;
  font-weight: bold;
  text-transform: uppercase;
}

.description {
  font-size: 12px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  margin: 5px;
  padding: 5px;
  background: #f8f8f8;
}
</style>
