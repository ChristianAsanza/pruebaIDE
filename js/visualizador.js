var vista = new ol.View({ projection: "EPSG:3857", center: ol.proj.transform([-3.67,38.1],'EPSG:4326', 'EPSG:3857'), zoom: 12,});
    var map = new ol.Map({target: 'map', view: vista, controls: ol.control.defaults().extend ([new ol.control.MousePosition ({ projection: 'EPSG:4326', coordinateFormat: ol.coordinate.toStringHDMS,}), new ol.control.ScaleLine (), new ol.control.ZoomSlider (),]),});
    //vista.fit([-8, 40, 0, 45], map.getSize());
    var wmsLayer = new ol.layer.Tile({type:'base', title:'PNOA', source: new ol.source.TileWMS({url: 'http://www.ign.es/wms-inspire/pnoa-ma',params: {LAYERS: 'OI.OrthoimageCoverage', FORMAT: 'image/png'},}) });

var wmsLayer2 = new ol.layer.Tile({type:'base', title:'IGN Base', source: new ol.source.TileWMS({url: 'http://www.ign.es/wms-inspire/ign-base',params: {LAYERS: 'IGNBaseTodo', FORMAT: 'image/png'},}) });

var vectorLayer = new ol.layer.Vector ({ 
    type: 'base',
	title:'Vacia',
});

var wmsLayer3 = new ol.layer.Tile({title:'Ortofoto', visible: false, source: new ol.source.TileWMS({url: 'http://localhost:8080/geoserver/dbli/wms', params: {LAYERS: 'ortofoto', FORMAT: 'image/png'},}) });
var wmsLayer4 = new ol.layer.Tile({title:'MDE', visible: false, source: new ol.source.TileWMS({url: 'http://localhost:8080/geoserver/dbli/wms', params: {LAYERS: 'mde', FORMAT: 'image/png'},}) });
var wmsLayer5 = new ol.layer.Tile({title:'Edificios Catastrales', source: new ol.source.TileWMS({url: 'http://localhost:8080/geoserver/dbli/wms', params: {LAYERS: 'edificios', FORMAT: 'image/png'},}) });
var wmsLayer6 = new ol.layer.Tile({title:'Viales', source: new ol.source.TileWMS({url: 'http://localhost:8080/geoserver/dbli/wms', params: {LAYERS: 'viales', FORMAT: 'image/png'},}) });
var wmsLayer7 = new ol.layer.Tile({title:'Caminos', source: new ol.source.TileWMS({url: 'http://localhost:8080/geoserver/dbli/wms', params: {LAYERS: 'caminos', FORMAT: 'image/png'},}) });
var wmsLayer8 = new ol.layer.Tile({title:'Nombre de calles', visible: false, source: new ol.source.TileWMS({url: 'http://localhost:8080/geoserver/dbli/wms', params: {LAYERS: 'nombrecalles', FORMAT: 'image/png'},}) });
var wmsLayer9 = new ol.layer.Tile({title:'Nombres geograficos', visible: false, source: new ol.source.TileWMS({url: 'http://localhost:8080/geoserver/dbli/wms', params: {LAYERS: 'toponimos', FORMAT: 'image/png'},}) });
var wmsLayer10 = new ol.layer.Tile({title:'Portales', visible: false, source: new ol.source.TileWMS({url: 'http://localhost:8080/geoserver/dbli/wms', params: {LAYERS: 'portales', FORMAT: 'image/png'},}) });
var wmsLayer11 = new ol.layer.Tile({title:'Municipio', source: new ol.source.TileWMS({url: 'http://localhost:8080/geoserver/dbli/wms', params: {LAYERS: 'municipio', FORMAT: 'image/png'}, gutter: 200,}) });
var wmsLayer12 = new ol.layer.Tile({title:'Catastro', visible: false, source: new ol.source.TileWMS({url: 'http://localhost:8080/geoserver/dbli/wms', params: {LAYERS: 'catastro', FORMAT: 'image/png'},}) });
var osmLayer = new ol.layer.Tile({title:'OSM', type: 'base', source: new ol.source.OSM()});
var group1 = new ol.layer.Group({title:'Capas base', layers: [vectorLayer, osmLayer, wmsLayer, wmsLayer2],});
var group2 = new ol.layer.Group({title:'Capas Overlay', layers: [wmsLayer3,wmsLayer4,wmsLayer5,wmsLayer6,wmsLayer7,wmsLayer8,wmsLayer9,wmsLayer10,wmsLayer11,wmsLayer12,],});
map.addLayer(group1);
map.addLayer(group2);
map.addControl(new ol.control.OverviewMap({layers: [new ol.layer.Tile(wmsLayer2.getProperties())],}));
var layerSwitcher = new ol.control.LayerSwitcher ({ 
    tipLabel: 'Leyenda'
});
map.addControl(layerSwitcher);
map.on('singleclick', function(evt) { document.getElementById('info').innerHTML = ''; var viewResolution = vista.getResolution(); var url= wmsLayer5.getSource().getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:3857', {'INFO_FORMAT': 'text/html'}); if (url) document.getElementById('info').data = url; });