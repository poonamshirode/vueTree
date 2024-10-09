import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Header from './Header.vue';

describe('Header Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Header);
  });

  it('renders correctly', () => {
    expect(wrapper.text()).toContain('Tree Structure');
  });

});
