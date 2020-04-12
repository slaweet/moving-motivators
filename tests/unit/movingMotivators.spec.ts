import { mount } from '@vue/test-utils';
import MovingMotivators from '@/components/MovingMotivators.vue';

import cards from '../../src/cards';
import setupVue from '../../src/setupVue';

setupVue();

describe('MovingMotivators.vue', () => {
  it('renders 10 cards', async () => {
    const wrapper = mount(MovingMotivators, { });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.card')).toHaveLength(cards.length);
  });

  it('dropping a card away from drop slots causes no change', async () => {
    const wrapper = mount(MovingMotivators, { });
    await wrapper.vm.$nextTick();

    const freedomCard = wrapper.findAll('.card').at(5);
    expect(freedomCard.find('.name').text()).toEqual('Freedom');

    const acceptanceSlot = wrapper.findAll('.slot').at(2 * 3 + 1);
    expect(acceptanceSlot.find('.name').text()).toEqual('Acceptance');

    freedomCard.trigger('dragstart');
    acceptanceSlot.trigger('dragenter');
    acceptanceSlot.trigger('dragover');
    acceptanceSlot.trigger('dragleave');
    freedomCard.trigger('dragend');

    await wrapper.vm.$nextTick();

    expect(acceptanceSlot.find('.name').text()).toEqual('Acceptance');
    expect(wrapper.findAll('.card').at(5).find('.name').text()).toEqual('Freedom');
  });

  it('allows dragging and dropping a card to reorder it', async () => {
    const wrapper = mount(MovingMotivators, { });
    await wrapper.vm.$nextTick();

    const freedomCard = wrapper.findAll('.card').at(5);
    expect(freedomCard.find('.name').text()).toEqual('Freedom');

    const acceptanceSlot = wrapper.findAll('.slot').at(2 * 3 + 1);
    expect(acceptanceSlot.find('.name').text()).toEqual('Acceptance');

    freedomCard.trigger('dragstart');
    acceptanceSlot.trigger('dragenter');
    acceptanceSlot.trigger('drop');

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('.card').at(2).find('.name').text()).toEqual('Freedom');
    expect(wrapper.findAll('.card').at(3).find('.name').text()).toEqual('Acceptance');
  });

  it('allows dragging and dropping a card to change its fulfilment', async () => {
    const wrapper = mount(MovingMotivators, { });
    await wrapper.vm.$nextTick();

    const firstSlot = wrapper.findAll('.slot').at(0);
    const secondSlot = wrapper.findAll('.slot').at(1);
    expect(firstSlot.text()).toEqual('');
    expect(secondSlot.text()).toContain('Curiosity');

    const curiosityCard = wrapper.findAll('.card').at(0);
    expect(curiosityCard.find('.name').text()).toEqual('Curiosity');

    curiosityCard.trigger('dragstart');
    firstSlot.trigger('dragenter');
    firstSlot.trigger('drop');

    expect(firstSlot.text()).toContain('Curiosity');
    expect(secondSlot.text()).toEqual('');
  });
});
