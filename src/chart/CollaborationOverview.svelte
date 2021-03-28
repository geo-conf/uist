<script>
  import { onMount } from 'svelte';
  // library that creates chart objects in page
  import Chart from 'chart.js';
  import _ from 'lodash';

  import { getContinentColor, getContinentName } from './common';

  export let title = `Collaborations across geographic regions`;
  export let fontSize = 20;
  export let dataset = undefined;

  let canvas;

  const years = _.map(dataset, 'year');
  const minYear = Math.min.apply(Math, years);
  const maxYear = Math.max.apply(Math, years);
  const labels = years.map((e) => `'${e}`);

  const aggregatedData = _.map(dataset, ({ year: y, collaborations }) => {
    const continent = collaborations.interContinental;
    const country = collaborations.international;

    return {
      year: y,
      international: country,
      interContinental: continent,
    };
  });

  // get data per year, per continent
  const internationalData = [];
  const interContinentalData = [];

  for (let y = minYear; y < maxYear + 1; y += 1) {
    const data = aggregatedData.find(({ year }) => year === y);
    internationalData.push(data.international);
    interContinentalData.push(data.interContinental);
  }

  function updateFontSize() {
    fontSize = Math.floor(window.innerWidth / 100);
    if (fontSize < 15) fontSize = 15;
    if (fontSize > 25) fontSize = 25;
    Chart.defaults.global.defaultFontSize = fontSize;
  }

  window.onresize = function () {
    updateFontSize();
  };

  // The chart
  onMount(async () => {
    Chart.defaults.global.defaultFontSize = fontSize;

    const myChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'International Collaborations',
            backgroundColor: '#7FBDF7',
            data: internationalData,
          },
          {
            label: 'Intercontinental Collaborations',
            backgroundColor: '#2772DE',
            data: interContinentalData,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: `${title}`,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: `years`,
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
    min-height: 400px;
  }
</style>
