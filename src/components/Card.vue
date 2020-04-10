<template>
  <span :class="{
      'card': true,
      'dragged': isDragged,
    }"
    draggable="true"
    @dragstart="handleDragStart()"
    @dragend="handleDragEnd">
    <span class="name" :style="{'background': card.color}">{{card.name}}</span>
    <span class="icon">
      <font-awesome-icon :icon="card.icon" size="4x" :style="{ color: '#cccccc' }" />
    </span>
    <span class="description">{{card.description}}</span>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Card as CardType } from '../types';

@Component({
  components: {
  },
})
export default class Card extends Vue {
  @Prop() card:CardType;

  @Prop() isDragged:boolean;

  handleDragStart() {
    this.$emit('dragstart');
  }

  handleDragEnd() {
    this.$emit('dragend');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  display: block;
  width: 100%;
  height: 160%;
  margin: -30px 0;
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
</style>
