<script>
  import * as am4core from '@amcharts/amcharts4/core';
  import * as am4maps from '@amcharts/amcharts4/maps';
  import worldMap from '@amcharts/amcharts4-geodata/worldHigh';
  import { onMount } from 'svelte';
  import _ from 'lodash';

  export let dataset;
  let chartdiv;
  let countryCounter = [];

  const countries = _.flatten(_.map(dataset, 'papers.countryList'));

  const cmap = new Map();
  for (let { value: country, occurrences: value } of countries) {
    if (cmap.has(country)) {
      cmap.set(country, cmap.get(country) + value);
    } else {
      cmap.set(country, value);
    }
  }
  countryCounter = [...cmap].map(([id, value]) => ({ id, value }));
  console.log(countryCounter);

  onMount(async () => {
    // Create map instance
    const chart = am4core.create('chartdiv', am4maps.MapChart);

    // Set map definition
    chart.geodata = worldMap;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;

    // Configure series
    const polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = '{id}: {value} papers';
    polygonTemplate.fill = am4core.color('#999');

    // Create hover state and set alternative fill color
    const hs = polygonTemplate.states.create('hover');
    hs.properties.fill = am4core.color('#ffc83b');

    // Remove Antarctica
    polygonSeries.exclude = ['AQ'];

    // Add heat rule
    polygonSeries.heatRules.push({
      property: 'fill',
      target: polygonSeries.mapPolygons.template,
      min: am4core.color('#6aaee9'),
      max: am4core.color('#062e52'),
      logarithmic: true,
    });

    // Add expectancy data
    polygonSeries.data = countryCounter;
  });
</script>

<svelte:head>
  <!-- <script src="https://cdn.amcharts.com/lib/4/core.js"></script>
  <script src="https://cdn.amcharts.com/lib/4/maps.js"></script>
  <script src="https://cdn.amcharts.com/lib/4/geodata/worldLow.js"></script> -->
</svelte:head>

<!-- <div class="test" bind:this={chartdiv} /> -->
<div bind:this={chartdiv} id="chartdiv" />

<style>
  #chartdiv {
    width: 100%;
    height: 45vh;
  }
</style>
