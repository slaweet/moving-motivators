<template>
  <div class="cards">
    <div v-for="card in cards" :key="card.name">
      <span :class="{
          'slot': true,
          'dragover': card.name === dropSlot && rate === dropRate,
          'dropable': draggedCard !== '',
        }"
        v-for="rate in rates"
        :key="rate"
        @drop="handleDrop(card, rate)"
        @dragover="(ev) => dragover(ev, card, rate)"
        @dragenter="dragenter(card, rate)"
        @dragleave="dragleave">
        <Card
          :isDragged="card.name === draggedCard"
          v-if="rate === card.rate && card.name !== invisibleCard && card.name !== dropSlot"
          :card="card"
          @touchstart="handleDragStart(card)"
          @touchend="handleDragEnd"
          @dragstart="handleDragStart(card)"
          @dragend="handleDragEnd">
        </Card>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Card as CardType, Rate } from '../types';
import Card from './Card.vue';

@Component({
  components: {
    Card,
  },
})
export default class Cards extends Vue {
  @Prop() cards:CardType[];

  rates:Rate[]=[Rate.High, Rate.Neutral, Rate.Low];

  draggedCard:string='';

  invisibleCard:string='';

  dropSlot:string='';

  dropRate:number=0;

  handleDragStart(card:CardType) {
    this.draggedCard = card.name;
    setTimeout(() => { this.invisibleCard = card.name; }, 0);
  }


  handleDragEnd() {
    this.draggedCard = '';
    this.invisibleCard = '';
  }

  handleDrop() {
    this.$emit('cardDrop', { draggedCard: this.draggedCard, dropSlot: this.dropSlot, rate: this.dropRate });
    this.draggedCard = '';
    this.invisibleCard = '';
    this.dropSlot = '';
    this.dropRate = 0;
  }

  // eslint-disable-next-line class-methods-use-this
  dragover(ev:any, card:CardType, rate:Rate) {
    this.dropSlot = card.name;
    this.dropRate = rate;
    ev.preventDefault();
  }

  dragenter(card:CardType, rate:Rate) {
    this.dropSlot = card.name;
    this.dropRate = rate;
  }

  dragleave() {
    this.dropSlot = '';
    this.dropRate = 0;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.cards {
  display: flex;
  align-items: center;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  height: 500px;
  justify-content: center;

}

.slot {
  display: block;
  width: 125px;
  height: 125px;
  margin: 3px;
  border-radius: 2px;
  border: transparent dashed 5px;
  transition: border 200ms ease-in-out;

  &::after {
    color: transparent;
    font-weight: bold;
    display: block;
    margin-top: 50px;
  }

  &:nth-child(1)::after {
    content: 'High';
  }

  &:nth-child(2)::after {
    content: 'Medium';
  }

  &:nth-child(3)::after {
    content: 'Low';
  }

  &.dropable {
    border-color: #e8e8e8;
    color: #e8e8e8;
  }

  &.dragover {
    background: #e8e8e8;

    &::after {
      color: #fff;
    }
  }
}
</style>
