/*eslint-disable*/

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2h1YmhhbWd1cHRhMTA5NiIsImEiOiJja293c2t3azIwMjM4MnFtYzc2dGI4Mm40In0.8mrHfjGWm2zA-E3fvps8qQ';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/shubhamgupta1096/ckowsvvvu0w7m17qgalujwyk6',
    scrollZoom: false,
    //   center: [-118.11349134, 34.111745],
    //   zoom: 4,
    //interactive: false
  });

  //Creating a new map area to display on loadup
  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create Marker
    const el = document.createElement('div');
    el.className = 'marker';

    //Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //Add Popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //Extend the map to include the current locations
    bounds.extend(loc.coordinates);
  });

  //Making the area that will display on loadup will have all the markers of the tour locations
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });

  //Adding zoom options to the map
  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-right');
};
