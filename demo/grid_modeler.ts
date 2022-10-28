import * as Cesium from "cesium"
import { Color } from 'cesium';
import "cesium/Source/Widgets/widgets.css"

Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMWViZmQyMy0yZWRiLTQ5MzAtOTk0OS0wZDQ5OTRjNjAzNmQiLCJpZCI6ODI1MTEsImlhdCI6MTY0NDkwMzYxM30.SWCnu7cEyz9QrSFMDFvU3ylaYeXcKDkY3VvwxekOZVM';

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
});    

viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
    orientation : {
    heading : Cesium.Math.toRadians(0.0),
    pitch : Cesium.Math.toRadians(-15.0),
    }
});