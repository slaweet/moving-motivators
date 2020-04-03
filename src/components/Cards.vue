<template>
  <div class="cards">
    <div v-for="card in cards" :key="card.name">
      <span :class="{
          'slot': true,
          'dragover': card.name === dropSlot,
        }"
        @drop="handleDrop(card)"
        @dragover="allowDrop"
        @dragenter="dragenter(card)"
        @dragleave="dragleave">
        <span :class="{
            'card': true,
            'dragged': card.name === draggedCard,
            'invisible': card.name === invisibleCard,
          }"
          draggable="true"
          @dragstart="handleDragStart(card)"
          @dragend="handleDragEnd">
          <span class="name" :style="{'background': card.color}">{{card.name}}</span>
          <span class="icon">
            <font-awesome-icon :icon="card.icon" size="4x" :style="{ color: '#cccccc' }" />
          </span>
          <span class="description">{{card.description}}</span>
        </span>
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

  draggedCard:string='';

  invisibleCard:string='';

  dropSlot:string='';

  handleDragStart(card:Card) {
    this.draggedCard = card.name;
    setTimeout(() => { this.invisibleCard = card.name; }, 0);
  }


  handleDragEnd() {
    this.draggedCard = '';
    this.invisibleCard = '';
  }

  handleDrop() {
    this.$emit('cardDrop', { draggedCard: this.draggedCard, dropSlot: this.dropSlot });
    this.draggedCard = '';
    this.invisibleCard = '';
    this.dropSlot = '';
  }

  // eslint-disable-next-line class-methods-use-this
  allowDrop(ev:any) {
    ev.preventDefault();
  }

  dragenter(card:Card) {
    this.dropSlot = card.name;
  }

  dragleave() {
    this.dropSlot = '';
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
  box-sizing: border-box;
  height: 80vh;
  justify-content: center;
}

.slot {
  display: block;
  width: 125px;
  height: 195px;
  margin: 5px;
  border-radius: 3px;

  &.dragover {
    background: #f8f8f8;

    & .card {
      display: none;
    }
  }

  & .card {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #cccccc;
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow:rgba(6, 6, 6, 0.06) 0px 2px 4px 0px;
    cursor: pointer;

    &.dragged {
      transform: ratate(10deg);
    }

    &.invisible {
      display: none;
    }

    & .name {
      color: white;
      background: #cccccc;
      padding: 5px;
      font-weight: bold;
      text-transform: uppercase;
      border-radius: 3px 3px 0 0;
    }

    & .icon {
      margin-bottom: -20px;
    }

    & .description {
      font-size: 12px;
      border: 1px solid #cccccc;
      border-radius: 3px;
      min-height: 35%;
      margin: 5px;
      padding: 5px;
      background: #f8f8f8;
    }
  }
}
</style>
