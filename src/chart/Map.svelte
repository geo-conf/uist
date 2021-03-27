<script>
  import * as am4core from '@amcharts/amcharts4/core';
  import * as am4maps from '@amcharts/amcharts4/maps';
  import worldLow from '@amcharts/amcharts4-geodata/worldLow';
  import { onMount } from 'svelte';
  let chartdiv;
  // Create map instance

  onMount(async () => {
    const chart = am4core.create('chartdiv', am4maps.MapChart);

    // Set map definition
    chart.geodata = worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    const polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;
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
    height: 38vh;
  }
  .test {
    width: 100%;
    height: 38vh;
    /* background-color: red; */
  }
</style>
