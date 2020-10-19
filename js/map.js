mapboxgl.accessToken = 'pk.eyJ1IjoiaGFpamluZzEwMTciLCJhIjoiY2tnZmk3dGxqMWt1ZTJ0cXFtc3R5MmxteSJ9.qR9NamkDSkydTgZM3OKsQQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-96.716784, 32.902776],
    zoom: 7
});



map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);

map.on('load', function () {

map.addSource('Typology', {
'type': 'geojson',
'data':'Typology.geojson'
    
});


map.addLayer({
'id': 'Typology',
'type': 'fill',
'source': 'Typology',
'layout': {'visibility': 'none'},
'paint': {
'fill-color': {property: 'type',
                type: 'categorical',
                stops: [
                    ['Early', '#d73027'],
                    ['Middle', '#fc8d59'],
                    ['Late', '#fee090'],
                    ['Susceptible', '#ffffbf'],
                    ['Vulnerable, not gentrifying','#DEDEDE']
                    ]},
'fill-outline-color':'rgba(0,0,0,0)',
'fill-opacity': 0.6
}
});

});

//TOGGLE POINT LAYERS
$('#type-toggle').on('click', function(){
    toggleType();
});

function toggleType(){
    if (map.getLayoutProperty('Typology', 'visibility') === 'visible') {
        map.setLayoutProperty('Typology', 'visibility', 'none');
    } else {
        map.setLayoutProperty('Typology', 'visibility', 'visible');
    }
    updateToggles();
}

function updateToggles(){
    if (map.getLayoutProperty('Typology', 'visibility') === 'visible'){
        $('#type-toggle').removeClass('fa-circle-o').addClass('fa-check-circle').removeClass('deactivated');
        
    } else {
        $('#type-toggle').removeClass('fa-check-circle').addClass('fa-circle-o').addClass('deactivated');
        
    }
}







