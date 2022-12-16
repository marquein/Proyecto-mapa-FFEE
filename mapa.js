// Crear la variable mapa con coordenadas de centro y zoom
let map = L.map('map').setView([-34.6212912,-58.4472271],13)

//Agregar mapa base de OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Volar a coordenadas de los sitios de la Lista desplegable
document.getElementById('select-location').addEventListener('change', function(e){
    let coords = e.target.value.split(",");
    map.flyTo(coords,18);
})

// Agregar mapa base para el Mini Mapa
var carto_light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {attribution: '©OpenStreetMap, ©CartoDB',subdomains: 'abcd',maxZoom: 24});

// Agregar plugin MiniMap
var minimap = new L.Control.MiniMap(carto_light,
    {
        toggleDisplay: true,
        minimized: false,
        position: "bottomleft"
    }).addTo(map);

// Agregar escala
 new L.control.scale({imperial: false, position: 'bottomright'}).addTo(map);

// Configurar PopUp
function popup(feature,layer){
    if(feature.properties && feature.properties.nombre){
        layer.bindPopup("<strong>Intervención: </strong>" + feature.properties.nombre + "<br/>" + "<strong>Fecha: </strong>" + feature.properties.fecha + "<br/>"+ "<strong>Como se resolvió: </strong>" + feature.properties.resolucion + "<br/>" + "<strong>Reseña: </strong>" + feature.properties.reseña + "<br/>");
    }
} 
//Agregar ícono personalizado tomado de Leaflet
var myBaseIcon = L.icon({
    iconUrl: 'Leaflet.Legend-master/examples/marker/ic_account_balance_grey600_48dp.png',
    iconSize: [22, 22],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

//Agregar las bases, tomado de quick-start de leaflet
var marker_bAnaDiaz = L.marker([-34.680629, -58.466203], {icon: myBaseIcon}).addTo(map);
var marker_bPedernera = L.marker([-34.660370, -58.431937], {icon: myBaseIcon}).addTo(map);
var marker_bItaqui = L.marker([-34.656986, -58.437121], {icon: myBaseIcon}).addTo(map);



//Agragar la leyenda
const Legend = L.control.Legend({
    position: "bottomright",
    collapsed: false,
    symbolWidth: 24,
    opacity:1,
    column:1,
    legends: [
        {
            label: "Base Ana Diaz",
            type: "image",
            url: "Leaflet.Legend-master/examples/marker/ic_account_balance_grey600_48dp.png",
            layers: marker_bAnaDiaz,
            
        }, {
            label: "Base Pedernera",
            type: "image",
            url: "Leaflet.Legend-master/examples/marker/ic_account_balance_grey600_48dp.png",
            layers: marker_bPedernera,
        },  {
            label: "Base Itaquí",
            type: "image",
            url: "Leaflet.Legend-master/examples/marker/ic_account_balance_grey600_48dp.png",
            layers: marker_bItaqui,
        }, {
            label: "Intervenciones de la División Negociación",
            type: "image",
            url: "Leaflet.Legend-master/examples/marker/ic_account_circle_black_36dp.png",
            layers: negociacionesJS,negociaciones
      
        }]
}).addTo(map);

/*/ Agregar control para ver los datos al pasar el puntero

var info = L.control();

// Crear un div con una clase info
info.onAdd = function(map){
    this._div = L.DomUtil.create('div','info');
    this.update();
    return this._div;
};

// Agregar el metodo que actualiza el control segun el puntero vaya pasando
info.update = function(props){
    this._div.innerHTML = '<h4>Reseña de la Intervención</h4>' + 
                            (props ? '<b>' + props.nombre + '</b><br/>' + props.reseña + ' viviendas</sup>'
                            : 'Pase el puntero por una intervención');
};

info.addTo(map);

// AGregar interaccion del puntero con la capa para resaltar el objeto
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    info.update(layer.feature.properties);
}
// Configurar los cambios de resaltado y zoom de la capa

var negociacionesJS;

function resetHighlight(e){
    negociacionesJS.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e){
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer){
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}*/


//Agregar la capa geojson con las intervenciones de los negociadores. Creamos en el geojson la variable "negociaciones"
var negociacionesJS = L.geoJson(negociaciones,{
    onEachFeature: popup
    //layer.bindpopup(feature.properties[´nombre'])
}).addTo(map);


// Agregar atribucion
map.attributionControl.addAttribution('Analizado por Marcos Cortina &copy; <a href="https://www.marcosgustavocortina.com/">MGC</a>');
