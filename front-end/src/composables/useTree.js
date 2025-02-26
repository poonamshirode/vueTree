import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

export function useTree(apiUrl, emit) {
  const chart = ref(null);
  const selectedNodes = ref([]); // Array to store selected nodes
  const error = ref(null);

  const getData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network Error');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      error.value = err.message;
      console.error('Failed to get data:', err);
      return null;
    }
  };

  const buildTree = (data) => {
    const map = {};
    data.forEach((item) => (map[item.name] = { ...item, children: [] }));
    const hierarchy = [];
    data.forEach((item) => {
      if (item.parent) {
        map[item.parent].children.push(map[item.name]);
      } else {
        hierarchy.push(map[item.name]);
      }
    });
    return hierarchy[0]; // Return the root node
  };

  const drawChart = async () => {
    try {
      const data = await getData();
      if (!data || data.length === 0) {
        error.value = 'No data found';
        return;
      }

      const root = d3.hierarchy(buildTree(data));
      const width = 1000;
      const height = 600;

      const svg = d3
        .select(chart.value)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(100, 50)');

      const treeLayout = d3.tree().size([height, width - 300]);
      treeLayout(root);

      // Draw links (edges)
      svg
        .selectAll('.link')
        .data(root.links())
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr(
          'd',
          d3
            .linkHorizontal()
            .x((d) => d.y)
            .y((d) => d.x)
        )
        .style('fill', 'none')
        .style('stroke', '#ccc')
        .style('stroke-width', '2px');

      // Draw rectangle nodes 
      const node = svg
        .selectAll('.node')
        .data(root.descendants())
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', (d) => `translate(${d.y},${d.x})`)
        .each(function (d) {
          d.element = this; // Store reference to the node element
        })
        .on('click', (event, d) => {
          handleNodeClick(d);
          emit('node-selected', d.data);
        });

      node
        .append('rect')
        .attr('width', 80)
        .attr('height', 60)
        .attr('x', -80) 
        .attr('y', -30)
        .style('fill', '#dedede')
        .style('cursor', 'pointer')
        .style('stroke', '#454545')
        .style('stroke-width', '1px')
        .on('mouseover', function () {
          d3.select(this).style('fill', '#b0b7bd');
        })
        .on('mouseout', function (event, d) {
          d3.select(this).style('fill', selectedNodes.value.includes(d) ? 'rgb(181 214 226)' : '#dedede');
        });

      node
        .append('text')
        .attr('dy', '0.2em')
        .attr('dx', '-3.5em')
        .attr('text-anchor', 'right')
        .text((d) => d.data.name)
        .style('fill', '#1c1818')
        .attr('font-size', '16px');

    } catch (err) {
      console.error('Unable to render tree:', err);
    }
  };

  const handleNodeClick = (nodeData) => {
    deselectAllNodes();
    selectedNodes.value.push(nodeData);
    d3.select(nodeData.element)
      .select('rect')
      .style('fill', 'rgb(181 214 226)')
      .style('filter', 'drop-shadow(1px 2px 3px rgba(0, 0, 0, 0.5))');
  };

  const deselectAllNodes = () => {
    selectedNodes.value.forEach((node) => {
      d3.select(node.element).select('rect').style('fill', '#dedede').style('filter', 'none');
    });
    selectedNodes.value = [];
  };

  onMounted(() => {
    drawChart();
  });

  return {
    chart,
    selectedNodes,
    deselectAllNodes,
    error
  };
}
