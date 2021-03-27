<script>
  import { onMount } from 'svelte';
  // library that creates chart objects in page
  import Chart from 'chart.js';
  import _ from 'lodash';

  import { getContinentColor, getContinentName } from './common';

  export let dataset = undefined;
  export let year = 10;
  export let title = `Committee members per geographic region in 20${year}`;
  export let xAxis = '';
  export let fontSize = 15;

  let canvas;

  const data = dataset.find(({ year: y }) => year === y);
  const continent = data.committee.continentList;
  continent.sort(({ occurrences: a }, { occurrences: b }) => b - a);

  const labels = continent.map(({ value }) => getContinentName(value));
  const occurrences = _.map(continent, 'occurrences');
  const colors = _.map(continent, 'value').map((c) => getContinentColor(c));

  // The chart
  onMount(async () => {
    Chart.defaults.global.defaultFontSize = fontSize;

    const myChart = new Chart(canvas, {
      type: 'horizontalBar',
      label: 'By continent',
      xAxisID: '# papers',
      data: {
        labels: labels,
        datasets: [
          {
            data: occurrences,
            backgroundColor: colors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: `${title}`,
        },
        legend: {
          display: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              display: true,
              scaleLabel: {
                display: true,
                labelString: `${xAxis}`,
              },
            },
          ],
        },
      },
    });
  });
</script>

<div class="container">
  <canvas bind:this={canvas} />
</div>

<style>
  .container {
    min-height: 500px;
  }
</style>
