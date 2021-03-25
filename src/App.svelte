<script>
  import {
    Col,
    Container,
    Row,
    Button,
    ButtonGroup,
    Collapse,
  } from 'sveltestrap';

  import { beforeUpdate } from 'svelte';

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
  import Footer from './ui/Footer.svelte';

  let overviewStats = true;
  let detailView = false;
  const startYear = 10;
  const endYear = 20;
  const defaultYear = 20;
  let selectedYear = defaultYear;
  let dataset = undefined;

  // load the data first from online repo
  jQ.getJSON(
    'https://raw.githubusercontent.com/geo-conf/geo-dataset/main/dataset.json',
    (data) => {
      dataset = data;
    }
  );

  let logoButton = [];
  for (let year = startYear; year <= endYear; year += 1) {
    logoButton.unshift({
      id: year,
      imgSrc: `./images/uist${year}.jpeg`,
      selected: false,
    });
  }

  highlightButton(defaultYear);

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

  function overview(event) {
    overviewStats = true;
  }
  function yearlyStats(event) {
    overviewStats = false;
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
</svelte:head>

<body>
  <div class="main">
    <Container class="mb-5 mt-5">
      <Row><Title conferenceName="UIST" /></Row>
    </Container>

    <!-- Description -->
    <Container class="mb-4 mt-4">
      <Row>
        <p class="lead">
          This website provides some insights into the geographical outreach and
          growth of the UIST community since 2010. The visualizations below show
          the main trends across the years or the statistics for each edition of
          the conference. Data of the proceedings was collected from the ACM
          digital library, while data for committee members was collected from
          the individual websites of the past editions of UIST. Raw data is
          available for download at this link, while summative data used for the
          visualizations is available here. The code used to gather this data
          and analyze is publicly available on Github.
        </p>
        <p class="lead">
          This project was developed by Andrea Bianchi at the MAKinteract lab
          (KAIST, Korea). The views, opinions, data analysis, and visualization
          expressed in this website are those of the author and by no means are
          meant to represent those of the ACM or the author's institution and
          colleagues. Please report mistakes, incorrect data, or suggestions as
          issues via Github.
        </p>
      </Row>
      <Row class="mb-5">
        <h2 on:click={() => (detailView = !detailView)} class="pointer-hand">
          👉 Click for details about data collection
        </h2>
      </Row>
      <Row class="mb-5">
        <Collapse isOpen={detailView}>
          <div>
            <p class="lead">
              Countries of affiliation were extracted from each paper of the
              proceedings directly from the ACM digital library. They are
              indicated here as reported by the authors, or, if they are
              omitted, were inserted programmatically (link). Countries of the
              affiliations are counted only once per paper, no matter how many
              authors from institutions of the same country participated in the
              paper. If authors belong to institutions from different countries,
              each country is counted once per paper. Data were then aggregated
              in continents (link) following a similar way.
            </p>
            <p class="lead">
              The list of the committee members (Associate Chairs a.k.a. ACs in
              the papers track) was obtained from the web pages of the
              individual editions of UIST. Program chairs or conference
              organizers with other roles are not included in this count.
              Affiliations were considered as listed on the websites (i.e., the
              affiliation "at that time", and not necessarily today).
            </p>
            <p class="lead">
              Collaborations are counted as international and collaborations.
              International collaborations are counted if the authors of the
              same paper are from different countries. Intercontinental
              collaborations are a subset of the former and are counted if two
              or more of the authors are from institutions in different
              continents.
            </p>
          </div>
        </Collapse>
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
          <Row class="mb-5 mt-5">
            <Col lg={{ size: 6, offset: 0 }}>
              <ContinentStack {dataset} />
            </Col>
            <Col lg={{ size: 6, offset: 0 }}>
              <CommitteeStacked {dataset} />
            </Col>
          </Row>
          <Row class="mb-5 mt-5">
            <Col lg={{ size: 6, offset: 3 }}>
              <CollaborationOverview {dataset} />
            </Col>
          </Row>
        </Container>

        <!-- Stats per year -->
      {:else}
        <!-- Grid of all UIST buttons -->
        <Container fluid={true}>
          <Col sm="12" md={{ size: 9, offset: 2 }}>
            {#each logoButton as buttonData}
              <Logo on:click={select} {...buttonData} />
            {/each}
          </Col>
        </Container>

        <Container class="mb-5 mt-5" fluid={true}>
          <Row class="mb-5 mt-5">
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
          </Row>
          <Row class="mb-5 mt-5">
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
</body>

<style>
  :global(body) {
    background-color: #2e2e31;
  }

  .pointer-hand {
    cursor: pointer;
  }
</style>
