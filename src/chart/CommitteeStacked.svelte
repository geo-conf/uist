<script>
  import { onMount } from 'svelte';
  // library that creates chart objects in page
  import Chart from 'chart.js';
  import _ from 'lodash';

  import { getContinentColor, getContinentName } from './common';

  export let title = `Committee members per geographic region of affiliation`;
  export let fontSize = 20;
  export let dataset = undefined;

  let canvas;

  const years = _.map(dataset, 'year');
  const minYear = Math.min.apply(Math, years);
  const maxYear = Math.max.apply(Math, years);
  const labels = years.map((e) => `'${e}`);

  const aggregatedData = _.map(dataset, ({ year: y, committee }) => {
    const daf = committee.continentList.find(({ value }) => value === 'AF');
    const das = committee.continentList.find(({ value }) => value === 'AS');
    const deu = committee.continentList.find(({ value }) => value === 'EU');
    const dna = committee.continentList.find(({ value }) => value === 'NA');
    const doc = committee.continentList.find(({ value }) => value === 'OC');
    const dsa = committee.continentList.find(({ value }) => value === 'SA');

    return {
      year: y,
      AF: daf === undefined ? 0 : daf.occurrences,
      AS: das === undefined ? 0 : das.occurrences,
      EU: deu === undefined ? 0 : deu.occurrences,
      NA: dna === undefined ? 0 : dna.occurrences,
      OC: doc === undefined ? 0 : doc.occurrences,
      SA: dsa === undefined ? 0 : dsa.occurrences,
    };
  });

  // get data per year, per continent
  const afData = [];
  const asData = [];
  const euData = [];
  const naData = [];
  const ocData = [];
  const saData = [];

  for (let y = minYear; y < maxYear + 1; y += 1) {
    const data = aggregatedData.find(({ year }) => year === y);
    afData.push(data.AF);
    asData.push(data.AS);
    euData.push(data.EU);
    naData.push(data.NA);
    ocData.push(data.OC);
    saData.push(data.SA);
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
            label: getContinentName('AF'),
            backgroundColor: getContinentColor('AF'),
            data: afData,
          },
          {
            label: getContinentName('AS'),
            backgroundColor: getContinentColor('AS'),
            data: asData,
          },
          {
            label: getContinentName('EU'),
            backgroundColor: getContinentColor('EU'),
            data: euData,
          },
          {
            label: getContinentName('NA'),
            backgroundColor: getContinentColor('NA'),
            data: naData,
          },
          {
            label: getContinentName('OC'),
            backgroundColor: getContinentColor('OC'),
            data: ocData,
          },
          {
            label: getContinentName('SA'),
            backgroundColor: getContinentColor('SA'),
            data: saData,
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
              stacked: true,
              scaleLabel: {
                display: true,
                labelString: `years`,
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
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
