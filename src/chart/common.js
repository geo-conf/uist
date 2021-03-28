const getContinentColor = (continent) => {
  // palette: https://en.wikipedia.org/wiki/Continent
  switch (continent) {
      case 'AF': return '#F9CD24';
      case 'AS': return '#ED2607';
      case 'EU': return '#B20004';
      case 'NA': return '#1FC606';
      case 'OC': return '#B0286D';
      case 'SA': return '#127003';
      default: break;
    }
    return 'rgba(120, 120, 120)';
}

const getContinentName = (abbr) => {

  // 7 continents: https://en.wikipedia.org/wiki/Continent
  // those not listed have no papers
  switch (abbr) {
      case 'AF': return 'AFRICA';
      case 'AS': return 'ASIA';
      case 'EU': return 'EUROPE';
      case 'NA': return 'NORTH AMERICA';
      case 'OC': return 'OCEANIA'; // Wikipedia calls this Austrailia but also Oceania
      case 'SA': return 'SOUTH AMERICA';
      default: break;
    }
    return undefined;
}


module.exports = {
  getContinentColor,
  getContinentName
};