<script>
  import {
    Col,
    Container,
    Row,
    Button,
    ButtonGroup,
    Collapse,
  } from 'sveltestrap';

  import { onMount } from 'svelte';

  import jQ from 'jquery';
  import Title from './ui/Title.svelte';
  import Logo from './ui/Logo.svelte';
  import CountryBar from './chart/CountryBar.svelte';
  import CommitteeBar from './chart/CommitteeBar.svelte';
  import ContinentBar from './chart/ContinentBar.svelte';
  import CollaborationBar from './chart/CollaborationBar.svelte';
  import ContinentStack from './chart/ContinentStack.svelte';
  import CommitteeStacked from './chart/CommitteeStacked.svelte';
  import CollaborationOverview from './chart/CollaborationOverview.svelte';
  import Forkme from './ui/Forkme.svelte';
  import Footer from './ui/Footer.svelte';
  import Map from './chart/Map.svelte';

  let overviewStats = true;
  let detailView = false;
  const startYear = 10;
  const endYear = 20;
  const defaultYear = 20;
  let selectedYear = defaultYear;
  let dataset;
  let imagesLoaded = false;
  let w; // window's width
  let logoButton = [];

  function highlightButton(year) {
    logoButton.forEach((b) => {
      b.selected = b.id === year;
    });
    logoButton = [...logoButton];
  }

  function select(event) {
    const selection = event.detail;
    selectedYear = selection.id;
    // refresh buttons
    highlightButton(selectedYear);
  }

  function overview() {
    overviewStats = true;
  }
  function yearlyStats() {
    overviewStats = false;
  }

  // load the data first from online repo
  jQ.getJSON(
    'https://raw.githubusercontent.com/geo-conf/geo-dataset/main/dataset.json',
    (data) => {
      dataset = data;
    }
  );

  onMount(() => {
    if ('loading' in HTMLImageElement.prototype) {
      imagesLoaded = true;
    }
  });

  for (let year = startYear; year <= endYear; year += 1) {
    logoButton.unshift({
      id: year,
      imgSrc: `./images/uist${year}.jpeg`,
      selected: false,
    });
  }

  highlightButton(defaultYear);
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
</svelte:head>

<div class="main" bind:clientWidth={w}>
  <Container class="mb-5 mt-5" fluid="sm">
    <!-- Hid banner in small sizes -->
    {#if w > 700}
      <Forkme url="https://github.com/geo-conf/uist" />
    {/if}
    <Row><Title conferenceName="UIST" /></Row>
  </Container>

  <!-- Description -->
  <Container class="mb-4 mt-4">
    <Row>
      <p class="lead">
        This website showcases an <a href="https://github.com/geo-conf"
          >open-source</a>
        independent visualization project that provides some insights into the geographical
        outreach and growth of the
        <a href="http://uist.acm.org">UIST conference</a> community. The graphs
        below are based upon
        <a href="https://github.com/geo-conf/geo-dataset">open-source data</a>
        and show emerging main trends since 2010.
      </p>
    </Row>
    <Row>
      <h2
        on:click={() => {
          detailView = !detailView;
        }}
        class="pointer-hand">
        👉 <span class="underline">
          Click for details about data collection and analysis</span>
      </h2>
    </Row>
    <Row class="mb-2">
      <Collapse isOpen={detailView}>
        <ul>
          <li class="lead">
            Data was <a href="https://github.com/geo-conf/scraper">collected</a>
            directly from the
            <a href="https://dl.acm.org">ACM digital library</a>
            and the webpages of each UIST conference's edition. A
            <a href="https://github.com/geo-conf/miner">custom script</a>
            was used to aggregate this data in a single
            <a href="https://github.com/geo-conf/geo-dataset">dataset</a>.
            <b>Countries</b>
            of affiliations are collected as indicated by the authors of the papers
            and indicated here following the
            <a href="https://www.iso.org/iso-3166-country-codes.html"
              >ISO 3166</a>
            country code standard. <b>Continents</b> are inferred using the
            <a href="https://en.wikipedia.org/wiki/Continent"
              >seven-continent model</a
            >. Countries of affiliation are counted only once per paper, no
            matter how many authors from institutions of the same country
            participated in the paper. If authors belong to institutions from
            different countries, each country is counted once per paper. The
            color coding in the graphs follows the same notation as
            <a href="https://en.wikipedia.org/wiki/Continent">Wikipedia</a>. The
            map is displayed using
            <a
              href="https://en.wikipedia.org/wiki/Miller_cylindrical_projection"
              >Miller cylindrical projection</a>
            as provided by <a href="https://www.amcharts.com">amCharts</a>.
          </li>

          <li class="lead">
            The list of the <b>committee members</b> (Associate Chairs a.k.a. ACs
            in the papers track) was obtained from the web pages of the individual
            editions of UIST. Program chairs or conference organizers with other
            roles are not included in the reported numbers. Affiliations were considered
            as listed on the websites (i.e., the affiliation at the time of the event,
            which are not necessarily the same today).
          </li>
          <li class="lead">
            <b>Collaborations</b> are counted as international and intercontinental.
            International collaborations are counted when the authors of the same
            paper are from different countries. Intercontinental collaborations are
            a subset of these, and are counted if two or more of the authors are
            from institutions located in different continents.
          </li>
        </ul>
      </Collapse>
    </Row>
    <Row>
      <p class="lead">
        <i>
          The views, opinions, data analysis, and visualization expressed in
          this website are those of the <a
            href="https://makinteract.kaist.ac.kr/andrea">author</a> and by no means
          are meant to represent those of the UIST conference organizers and committees,
          the ACM, or the author's institution and colleagues.
        </i>
        Please report mistakes, incorrect data, or suggestions as
        <a href="https://github.com/geo-conf/uist/issues">issues via Github</a>.
        To contribute to the project, consider forking the repository.
      </p>
    </Row>
  </Container>

  <Container class="mb-5" fluid={true}>
    <div class="d-flex justify-content-center">
      <ButtonGroup>
        <Button
          on:click={overview}
          active={overviewStats}
          outline
          color="primary">Overview</Button>
        <Button
          on:click={yearlyStats}
          active={!overviewStats}
          outline
          color="primary">Yearly stats</Button>
      </ButtonGroup>
    </div>
  </Container>

  <!-- Overview stats -->
  {#if dataset !== undefined}
    {#if overviewStats}
      <Container class="mb-5 mt-5" fluid={true}>
        <Row class="mb-5">
          <Map {dataset} />
        </Row>

        <Row class="mt-5">
          <Col class="mb-5" lg={{ size: 6, offset: 0 }}>
            <ContinentStack {dataset} />
          </Col>
          <Col class="mb-5" lg={{ size: 6, offset: 0 }}>
            <CommitteeStacked {dataset} />
          </Col>
        </Row>
        <Row class="mb-5">
          <Col lg={{ size: 6, offset: 3 }}>
            <CollaborationOverview {dataset} />
          </Col>
        </Row>
      </Container>

      <!-- Stats per year -->
    {:else}
      <!-- Grid of all UIST buttons -->
      {#if imagesLoaded}
        <Container>
          <Row class="justify-content-center">
            {#each logoButton as buttonData}
              <Col xs="4" sm="4" md="2" lg="2" xl="2" class="mb-2">
                <Logo on:click={select} {...buttonData} />
              </Col>
            {/each}
          </Row>
        </Container>
      {/if}

      <Container class="mb-5 mt-5" fluid={true}>
        <Row>
          <Col lg={{ size: 6, offset: 0 }}>
            {#if selectedYear === 10}
              <CountryBar {dataset} year={10} />
            {:else if selectedYear === 11}
              <CountryBar {dataset} year={11} />
            {:else if selectedYear === 12}
              <CountryBar {dataset} year={12} />
            {:else if selectedYear === 13}
              <CountryBar {dataset} year={13} />
            {:else if selectedYear === 14}
              <CountryBar {dataset} year={14} />
            {:else if selectedYear === 15}
              <CountryBar {dataset} year={15} />
            {:else if selectedYear === 16}
              <CountryBar {dataset} year={16} />
            {:else if selectedYear === 17}
              <CountryBar {dataset} year={17} />
            {:else if selectedYear === 18}
              <CountryBar {dataset} year={18} />
            {:else if selectedYear === 19}
              <CountryBar {dataset} year={19} />
            {:else if selectedYear === 20}
              <CountryBar {dataset} year={20} />
            {/if}
          </Col>
          <Col lg={{ size: 6, offset: 0 }}>
            {#if selectedYear === 10}
              <CollaborationBar {dataset} year={10} />
            {:else if selectedYear === 11}
              <CollaborationBar {dataset} year={11} />
            {:else if selectedYear === 12}
              <CollaborationBar {dataset} year={12} />
            {:else if selectedYear === 13}
              <CollaborationBar {dataset} year={13} />
            {:else if selectedYear === 14}
              <CollaborationBar {dataset} year={14} />
            {:else if selectedYear === 15}
              <CollaborationBar {dataset} year={15} />
            {:else if selectedYear === 16}
              <CollaborationBar {dataset} year={16} />
            {:else if selectedYear === 17}
              <CollaborationBar {dataset} year={17} />
            {:else if selectedYear === 18}
              <CollaborationBar {dataset} year={18} />
            {:else if selectedYear === 19}
              <CollaborationBar {dataset} year={19} />
            {:else if selectedYear === 20}
              <CollaborationBar {dataset} year={20} />
            {/if}
          </Col>
        </Row>
        <Row>
          <Col lg={{ size: 6, offset: 0 }}>
            {#if selectedYear === 10}
              <ContinentBar {dataset} year={10} />
            {:else if selectedYear === 11}
              <ContinentBar {dataset} year={11} />
            {:else if selectedYear === 12}
              <ContinentBar {dataset} year={12} />
            {:else if selectedYear === 13}
              <ContinentBar {dataset} year={13} />
            {:else if selectedYear === 14}
              <ContinentBar {dataset} year={14} />
            {:else if selectedYear === 15}
              <ContinentBar {dataset} year={15} />
            {:else if selectedYear === 16}
              <ContinentBar {dataset} year={16} />
            {:else if selectedYear === 17}
              <ContinentBar {dataset} year={17} />
            {:else if selectedYear === 18}
              <ContinentBar {dataset} year={18} />
            {:else if selectedYear === 19}
              <ContinentBar {dataset} year={19} />
            {:else if selectedYear === 20}
              <ContinentBar {dataset} year={20} />
            {/if}
          </Col>

          <Col lg={{ size: 6, offset: 0 }}>
            {#if selectedYear === 10}
              <CommitteeBar {dataset} year={10} />
            {:else if selectedYear === 11}
              <CommitteeBar {dataset} year={11} />
            {:else if selectedYear === 12}
              <CommitteeBar {dataset} year={12} />
            {:else if selectedYear === 13}
              <CommitteeBar {dataset} year={13} />
            {:else if selectedYear === 14}
              <CommitteeBar {dataset} year={14} />
            {:else if selectedYear === 15}
              <CommitteeBar {dataset} year={15} />
            {:else if selectedYear === 16}
              <CommitteeBar {dataset} year={16} />
            {:else if selectedYear === 17}
              <CommitteeBar {dataset} year={17} />
            {:else if selectedYear === 18}
              <CommitteeBar {dataset} year={18} />
            {:else if selectedYear === 19}
              <CommitteeBar {dataset} year={19} />
            {:else if selectedYear === 20}
              <CommitteeBar {dataset} year={20} />
            {/if}
          </Col>
        </Row>
      </Container>
    {/if}
  {/if}

  <Container class="mb-5" fluid={true}>
    <div class="d-flex justify-content-center">
      <Footer />
    </div>
  </Container>
</div>

<style>
  .main {
    width: 100%;
    height: 100%;
    /* position: absolute; */
    top: 0;
    left: 0;
    overflow: hidden;
  }

  .pointer-hand {
    cursor: pointer;
  }

  b {
    text-decoration: underline;
  }

  .underline {
    text-decoration: underline;
  }
</style>
