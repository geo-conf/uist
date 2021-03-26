<script>
  export let conferenceName;
</script>

<div>
  <h1>The <span class="nobr">GE🌐GRAPHY</span></h1>
  <h1>
    <span class="nobr"
      >of <span class="gradient-text">{conferenceName}</span></span>
  </h1>
</div>

<style>
  div {
    margin: auto;
  }

  h1 {
    font-family: helvetica, arial, sans-serif;
    color: #2e2e31;
    font-size: 50px;
    font-weight: bold;
    text-decoration: none;
    letter-spacing: -3px;
    margin: auto;
    display: inline;
  }

  .nobr {
    white-space: nowrap;
  }

  /* Tutorial on https://fossheim.io/writing/posts/css-text-gradient. */

  .gradient-text {
    /* Fallback: Set a background color. */
    background-color: #ca4246;
    margin-left: 0.5rem;

    /* Create the gradient. */
    background-image: linear-gradient(
      45deg,
      #127003 5.666%,
      #ed2607 16.666%,
      #ed2607 16.333%,
      #b20004 33.333%,
      #b20004 33%,
      #f9cd24 66.666%,
      #f9cd24 83.333%
    );

    /* Set the background size and repeat properties. */
    background-size: 200%;
    background-repeat: repeat;

    /* Use the text as a mask for the background. */
    /* This will show the gradient as a text color rather than element bg. */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    /* Animate the text when loading the element. */
    /* This animates it on page load and when hovering out. */
    animation: rainbow-text-simple-animation-rev 2s ease forwards;
  }

  /* Move the background and make it smaller. */
  /* Animation shown when entering the page and after the hover animation. */
  @keyframes rainbow-text-simple-animation-rev {
    0% {
      background-size: 650%;
    }
    40% {
      background-size: 650%;
    }
    100% {
      background-size: 100%;
    }
  }

  /* Move the background and make it larger. */
  /* Animation shown when hovering over the text. */
  @keyframes rainbow-text-simple-animation {
    0% {
      background-size: 100%;
    }
    80% {
      background-size: 650%;
    }
    100% {
      background-size: 650%;
    }
  }
</style>
