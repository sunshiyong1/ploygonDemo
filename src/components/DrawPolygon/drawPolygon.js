function polygonData() {
    import 'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js'
    import 'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.css'
    import 'https://api.tiles.mapbox.com/mapbox.js/plugins/turf/v3.0.11/turf.min.js'
    import 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.2.0/mapbox-gl-draw.js'
    import 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-draw/v1.2.0/mapbox-gl-draw.css'
    mapboxgl.accessToken = 'pk.eyJ1IjoieGlhb3NoaXRvdTEiLCJhIjoiY2tpNnF4NnV2MDFodjJ5cGdtNzF2enpkaiJ9.4bssGVafNq1pfM818m0jHA';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-zh-v1', //hosted style id
        // center: [-91.874, 42.76], // starting position
        // center:[116.20,39.56],
        center: [116.40, 39.90],
        zoom: 12 // starting zoom
    });

    var draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
            polygon: true,
            trash: true
        }
    });
    map.addControl(draw);


    /* var feature = { type: 'Point', coordinates: [116.40, 39.90] };
    var featureIds = draw.add(feature);
    console.log(featureIds); */

    /* var feature = {
        geometry: {coordinates: Array(1), type: "Polygon"}
        id: "a1e629b9245f38b04c868749dcdaafb8"
        properties: {}
        type: "Feature"
    };
    var featureIds = draw.add(feature)
    console.log(featureIds); */
    var feature = {
        id: "3384bf8ba11d11b4eb6c6bfa50a861ba",
        type: "Feature",
        properties: {},
        geometry: {
            coordinates: [
                [
                    [116.38858451842788, 39.92073844940944],
                    [116.38927116393643, 39.907703585565855],
                    [116.40781059264708, 39.90849364793152],
                    [116.38858451842788, 39.92073844940944]
                ], [
                    [117.38858451842788, 39.92073844940944],
                    [118.38927116393643, 39.907703585565855],
                    [119.40781059264708, 39.90849364793152],
                    [117.38858451842788, 39.92073844940944]
                ],
                [
                    [117.38858451842788, 39.92073844940944],
                    [118.38927116393643, 39.907703585565855],
                    [119.40781059264708, 39.90849364793152],
                    [113.38858451842788, 39.92073844940944],
                    [117.38858451842788, 39.92073844940944]

                ]
            ],
            type: "Polygon"
        }
    }
    var featureIds = draw.add(feature)
    console.log(featureIds);

    map.on('draw.create', updateArea);
    map.on('draw.delete', updateArea);
    map.on('draw.update', updateArea);

    function updateArea(e) {
        var data = draw.getAll();
        var answer = document.getElementById('calculated-area');
        console.log(JSON.stringify(data.features))

        debugger
        if (data.features.length > 0) {
            var area = turf.area(data);
            // restrict to area to 2 decimal points
            var rounded_area = Math.round(area * 100) / 100;
            answer.innerHTML =
                '<p><strong>' +
                rounded_area +
                '</strong></p><p>平方米</p>';
        } else {
            answer.innerHTML = '';
            if (e.type !== 'draw.delete')
                alert('Use the draw tools to draw a polygon!');
        }
    }
}
export default polygonData()