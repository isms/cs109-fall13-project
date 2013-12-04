var map;
$(document).ready(function() {
    var road_layer = new L.TileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png', {
            maxZoom: 18,
            subdomains: ['1', '2', '3', '4'],
            attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
        }),
        satellite_layer = new L.TileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png', {
            maxZoom: 18,
            subdomains: ['1', '2', '3', '4'],
            attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a>.'
        }),
    map = new L.Map('map-container', {
        center: new L.LatLng(37.92686760148135, -96.767578125),
        zoom: 4,
        layers: [
            road_layer
        ]
    });

    var geojsonLayer = new L.GeoJSON(null, {
        onEachFeature: function (feature, layer) {
            if (feature.properties) {
                var popupString = '<div class="popup">';
                for (var k in feature.properties) {
                    var v = feature.properties[k];
                    popupString += k + ': ' + v + '<br />';
                }
                popupString += '</div>';
                layer.bindPopup(popupString, {
                    maxHeight: 200
                });
            }
        }
    });

    map.addLayer(geojsonLayer);

    L.control.layers({'Road': road_layer, 'Satellite': satellite_layer}, {'GeoJSON': geojsonLayer}).addTo(map);

});