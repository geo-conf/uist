<script>
  import { onMount } from 'svelte';
  // library that creates chart objects in page
  import Chart from 'chart.js';
  import _ from 'lodash';

  import { getContinentColor } from './common';

  export let dataset = undefined;
  export let year = 10;
  export let title = `Papers per country of affiliation in 20${year}`;
  export let xAxis = '';
  export let fontSize = 20;
  let canvas;

  function updateFontSize() {
    fontSize = Math.floor(window.innerWidth / 100);
    if (fontSize < 15) fontSize = 15;
    if (fontSize > 25) fontSize = 25;
    Chart.defaults.global.defaultFontSize = fontSize;
  }

  const data = dataset.find(({ year: y }) => year === y);
  const countries = data.papers.countryList;
  countries.sort(({ occurrences: a }, { occurrences: b }) => b - a);

  const labels = countries.map(({ value }) => value);
  const occurrences = _.map(countries, 'occurrences');
  const colors = _.map(countries, 'continent').map((c) => getContinentColor(c));
  updateFontSize();

  window.onresize = () => {
    updateFontSize();
  };

  // The chart
  onMount(async () => {
    Chart.defaults.global.defaultFontSize = fontSize;

    const myChart = new Chart(canvas, {
      type: 'horizontalBar',
      data: {
        labels,
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

<canvas bind:this={canvas} />
