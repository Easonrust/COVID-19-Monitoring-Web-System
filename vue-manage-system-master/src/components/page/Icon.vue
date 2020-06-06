<template>
    <div id="globeViz"></div>
</template>

<script>
import Globe from 'globe.gl';
import * as d3 from 'd3';
export default {
    data: function() {
        return {};
    },
    mounted() {
        const globeContainer = document.getElementById('globeViz');
        const flagEndpoint = 'https://corona.lmao.ninja/assets/img/flags';
        let world = Globe()(globeContainer)
            .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
            .backgroundImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
            .showGraticules(false)
            .polygonAltitude(0.06)
            // .polygonCapColor(feat => colorScale(getVal(feat)))
            .polygonSideColor(() => 'rgba(0, 100, 0, 0.05)')
            .polygonStrokeColor(() => '#111')
                .polygonLabel(
                    ({ properties: d}) => `
                <div class="card">
                  <img class="card-img" src="${flagEndpoint}/${d.ISO_A2.toLowerCase()}.png" alt="flag" />
                  <div class="container">
                     <span class="card-title"><b>${d.NAME}</b></span> <br />
                     <div class="card-spacer"></div>
                     <hr />
                     <div class="card-spacer"></div>
                     <span>Population: ${d3.format('.3s')(d.POP_EST)}</span>
                  </div>
                </div>
              `
                )
            .onPolygonHover(
                hoverD => world.polygonAltitude(d => (d === hoverD ? 0.12 : 0.06))
                // .polygonCapColor(d => (d === hoverD ? 'steelblue' : colorScale(getVal(d))))
            )
            .polygonsTransitionDuration(200);
    }
};
</script>

    <style>
#globalArea {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
}
</style>

