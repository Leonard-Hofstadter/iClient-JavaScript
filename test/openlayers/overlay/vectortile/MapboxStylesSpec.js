import ol from 'openlayers';
import * as oldebug from 'openlayers/dist/ol-debug';
import '../../../libs/openlayers/plugins/ol-mapbox-style/2.11.2/olms';
import {
    MapboxStyles
} from '../../../../src/openlayers/overlay/vectortile/MapboxStyles';
import {
    MapService
} from '../../../../src/openlayers/services/MapService';
import {
    VectorTileSuperMapRest
} from '../../../../src/openlayers/overlay/VectorTileSuperMapRest';
import {
    FetchRequest
} from '../../../../src/common/util/FetchRequest';

ol.render.canvas = oldebug.render.canvas;
ol.geom.flat = oldebug.geom.flat;

describe('openlayers_MapboxStyles', () => {
    var url = GlobeParameter.californiaURL
    var testDiv, map, mapboxStyles, originalTimeout, stylesOptions;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);

        map = new ol.Map({
            target: 'map',
            view: new ol.View({
                center: [-122.228687503369, 38.1364932162598],
                zoom: 10,
                minZoom: 10,
                maxZoom: 14,
                projection: 'EPSG:4326',
            })
        });
        stylesOptions = {
            url: url,
            map: map,
            source: 'California'
        };
        spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
            if (testUrl.indexOf("vectorstyles.json") > 0) {
                expect(testUrl).toBe(url + "/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true");
                return Promise.resolve(new Response(JSON.stringify(vectorstylesEscapedJson)));
            } else if (testUrl.indexOf("sprite.json") > 0) {
                return Promise.resolve(new Response(JSON.stringify(spriteEscapedJson)));
            };
            return null;

        });

    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {

        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
    });

    it('getStyleFunction', (done) => {
        var style;
        mapboxStyles = new MapboxStyles(stylesOptions);
        setTimeout(() => {
            style = mapboxStyles.getStyleFunction();
            expect(style).not.toBeNull();
            done();
        }, 2000);
    });

    it('getStyleFunction,setSelectedId', (done) => {
        var style;
        mapboxStyles = new MapboxStyles(stylesOptions);
        setTimeout(() => {
            mapboxStyles.setSelectedId(1, 1);
            style = mapboxStyles.getStyleFunction();
            expect(style).not.toBeNull();
            done();
        }, 2000);

    });

    it('getStylesBySourceLayer', (done) => {
        var layer;
        mapboxStyles = new MapboxStyles(stylesOptions);
        setTimeout(() => {
            layer = mapboxStyles.getStylesBySourceLayer("Military_R@California");
            expect(layer).not.toBeNull();
            expect(layer[0].paint).not.toBeNull();
            expect(layer[0].paint["fill-color"]).toBe("rgba(249,224,219,0.90)");
            vectorstylesEscapedJson.layers[2].paint["fill-color"] = "rgba(255,0,0,0)";
            delete vectorstylesEscapedJson.sprite;
            delete vectorstylesEscapedJson.glyphs;
            mapboxStyles.setStyle(vectorstylesEscapedJson);
            layer = mapboxStyles.getStylesBySourceLayer("Military_R@California");
            expect(layer).not.toBeNull();
            expect(layer[0].paint).not.toBeNull();
            expect(layer[0].paint["fill-color"]).toBe("rgba(255,0,0,0)");
            done();
        }, 2000);
    });
})