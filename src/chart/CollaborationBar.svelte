<script>
  import { onMount } from 'svelte';
  // library that creates chart objects in page
  import Chart from 'chart.js';

  export let dataset;
  export let year = 10;
  export let title = `Inter-regional collaborations in 20${year}`;
  export let xAxis = '';
  export let fontSize = 15;

  let canvas;

  const data = dataset.find(({ year: y }) => year === y);
  const collab = data.collaborations;

  const labels = ['INTERNATIONAL', 'INTERCONTINENTAL'];
  const occurrences = [collab.international, collab.interContinental];
  const colors = ['#7FBDF7', '#2772DE'];

  // The chart
  onMount(async () => {
    Chart.defaults.global.defaultFontSize = fontSize;

    const myChart = new Chart(canvas, {
      type: 'horizontalBar',
      label: 'By continent',
      xAxisID: '# papers',
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
              display: true,
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

<div class="container">
  <canvas bind:this={canvas} />
</div>

<style>
  .container {
    min-height: 400px;
  }
</style>
