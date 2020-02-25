import { mount } from '@vue/test-utils';
import MovingMotivators from '@/components/MovingMotivators.vue';

import cards from '../../src/cards';

describe('MovingMotivators.vue', () => {
  it('renders 10 cards', async () => {
    const wrapper = mount(MovingMotivators, { });
    await wrapper.vm.$nextTick();
    expect(wrapper.findAll('.card')).toHaveLength(cards.length);
  });
});
