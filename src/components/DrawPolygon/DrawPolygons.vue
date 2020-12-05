<template>
  <div>
    <div id="map" style="width: 100vw; height: 50vh"></div>
    <div class="calculation-box">
      <p>使用右上角绘图工具绘制多边形</p>
      <div id="calculated-area"></div>
    </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "mapbox-gl-draw/dist/mapbox-gl-draw.css";
import MapboxDraw from "mapbox-gl-draw";
import turf from "turf/turf";

export default {
  data() {
    return {
      list: [],
      draw: null,
    };
  },
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoieGlhb3NoaXRvdTEiLCJhIjoiY2tpNnF4NnV2MDFodjJ5cGdtNzF2enpkaiJ9.4bssGVafNq1pfM818m0jHA";
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-zh-v1", //hosted style id
      // center: [-91.874, 42.76], // starting position
      // center:[116.20,39.56],
      center: [116.4, 39.9],
      zoom: 12, // starting zoom
    });

    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });
    map.addControl(this.draw);

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
    // var feature = {
    //   id: "3384bf8ba11d11b4eb6c6bfa50a861ba",
    //   type: "Feature",
    //   properties: {},
    //   geometry: {
    //     coordinates: [
    //       [
    //         [116.38858451842788, 39.92073844940944],
    //         [116.38927116393643, 39.907703585565855],
    //         [116.40781059264708, 39.90849364793152],
    //         [116.38858451842788, 39.92073844940944],
    //       ]/* ,
    //       [
    //         [117.38858451842788, 39.92073844940944],
    //         [118.38927116393643, 39.907703585565855],
    //         [119.40781059264708, 39.90849364793152],
    //         [117.38858451842788, 39.92073844940944],
    //       ],
    //       [
    //         [117.38858451842788, 39.92073844940944],
    //         [118.38927116393643, 39.907703585565855],
    //         [119.40781059264708, 39.90849364793152],
    //         [113.38858451842788, 39.92073844940944],
    //         [117.38858451842788, 39.92073844940944],
    //       ], */
    //     ],
    //     type: "Polygon",
    //   },
    // };

    setTimeout(() => {
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
              [116.38858451842788, 39.92073844940944],
            ] ,
          /* [
            [117.38858451842788, 39.92073844940944],
            [118.38927116393643, 39.907703585565855],
            [119.40781059264708, 39.90849364793152],
            [117.38858451842788, 39.92073844940944],
          ],
          [
            [117.38858451842788, 39.92073844940944],
            [118.38927116393643, 39.907703585565855],
            [119.40781059264708, 39.90849364793152],
            [113.38858451842788, 39.92073844940944],
            [117.38858451842788, 39.92073844940944],
          ], */
          ],
          type: "Polygon",
        },
      };
      var featureIds = this.draw.add(feature);
      console.log(featureIds);
    }, 2000);

    map.on("draw.create", this.updateArea);
    map.on("draw.delete", this.updateArea);
    map.on("draw.update", this.updateArea);
  },
  methods: {
    updateArea(e) {
      var data = this.draw.getAll();
      var answer = document.getElementById("calculated-area");
      console.log(JSON.stringify(data.features));
      if (data.features.length > 0) {
        var area = turf.area(data);
        // restrict to area to 2 decimal points
        var rounded_area = Math.round(area * 100) / 100;
        answer.innerHTML =
          "<p><strong>" + rounded_area + "</strong></p><p>平方米</p>";
      } else {
        answer.innerHTML = "";
        if (e.type !== "draw.delete")
          alert("Use the draw tools to draw a polygon!");
      }
    },
  },
};
</script>

<style>
.calculation-box {
  height: 75px;
  width: 150px;
  position: absolute;
  bottom: 40px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px;
  text-align: center;
}

p {
  font-family: "Open Sans";
  margin: 0;
  font-size: 13px;
}
</style>