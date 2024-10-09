import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Toast from '../components/Toast/Toast.vue';
import { useTree } from '../composables/useTree';
import { computed } from 'vue';
import HomeView from './HomeView.vue';

// Mock the useTree composable
vi.mock('../composables/useTree', () => ({
  useTree: vi.fn(),
}));

describe('Component Test', () => {
  it('renders the tree container', () => {
    // Mock return values from useTree
    useTree.mockReturnValue({
      chart: { value: {} },
      selectedNodes: { value: [] },
      deselectAllNodes: vi.fn(),
      error: null,
    });

    // Mount the component
    const wrapper = mount(HomeView, {
      components: { Toast },
      setup() {
        const { chart, selectedNodes, deselectAllNodes, error } = useTree('http://localhost:4000/api/data', vi.fn());

        const selectedNode = computed(() => selectedNodes.value[0]?.data);
        return { selectedNode, chart, deselectAllNodes, error };
      },
    });

    // Check if the tree div is rendered
    expect(wrapper.find('.tree').exists()).toBe(true);
  });

  it('renders the Toast component when a node is selected', () => {
    // Mock return values from useTree with a selected node
    useTree.mockReturnValue({
      chart: { value: {} },
      selectedNodes: { value: [{ data: { name: 'Node A' } }] },
      deselectAllNodes: vi.fn(),
      error: null,
    });

    // Mount the component
    const wrapper = mount({
        template: `
        <section>
          <Toast v-if="selectedNode" :data="selectedNode" :callback="deselectAllNodes" />
          <div class="tree" ref="chart"></div>
          <div v-if="error" class="error">{{ error }}</div>
        </section>
      `,
      components: { Toast },
      setup() {
        const { chart, selectedNodes, deselectAllNodes, error } = useTree('http://localhost:4000/api/data', vi.fn());

        const selectedNode = computed(() => selectedNodes.value[0]?.data);
        return { selectedNode, chart, deselectAllNodes, error };
      },
    });

    // Check if the Toast component is rendered with the correct data
    expect(wrapper.findComponent(Toast).exists()).toBe(true);
    expect(wrapper.findComponent(Toast).props('data')).toEqual({ name: 'Node A' });
  });

  it('renders the error message when an error occurs', () => {
    // Mock return values from useTree with an error
    useTree.mockReturnValue({
      chart: { value: {} },
      selectedNodes: { value: [] },
      deselectAllNodes: vi.fn(),
      error: 'An error occurred',
    });

    // Mount the component
    const wrapper = mount({
      template: `
        <section>
          <Toast v-if="selectedNode" :data="selectedNode" :callback="deselectAllNodes" />
          <div class="tree" ref="chart"></div>
          <div v-if="error" class="error">{{ error }}</div>
        </section>
      `,
      components: { Toast },
      setup() {
        const { chart, selectedNodes, deselectAllNodes, error } = useTree('http://localhost:4000/api/data', vi.fn());

        const selectedNode = computed(() => selectedNodes.value[0]?.data);
        return { selectedNode, chart, deselectAllNodes, error };
      },
    });

    // Check if the error message is rendered
    expect(wrapper.find('div.error').text()).toContain('An error occurred');
  });
});
