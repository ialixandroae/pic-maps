import React, { useEffect, useRef, useContext, useState } from 'react';
import { loadModules } from 'esri-loader';
import { store } from '../../store/store';
import UploadPicture from '../upload/UploadPicture';
import ReactDOM from 'react-dom';
import { rgbToHex } from '../../helpers/helpers';
import Credits from '../credits/Credits';

export const WebMapView = () => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const mapRef = useRef();
  const [mapView, setView] = useState(null);
  const [vtLayer, setVtLayer] = useState(null);

  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    async function loadWebMap() {
      const [Map, MapView, Expand, VectorTileLayer] = await loadModules(
        [
          'esri/Map',
          'esri/views/MapView',
          'esri/widgets/Expand',
          'esri/layers/VectorTileLayer',
        ],
        {
          css: true,
        }
      );

      const layer = new VectorTileLayer({
        // esri world vector tile service
        portalItem: {
          id: 'effe3475f05a4d608e66fd6eeb2113c0',
        },
      });
      setVtLayer(layer);
      const map = new Map();
      map.add(layer);

      const view = new MapView({
        container: mapRef.current,
        map: map,
        zoom: 4,
        center: [15, 45], // longitude, latitude
      });

      setView(view);

      var node = document.createElement('div');
      ReactDOM.render(<UploadPicture dispatch={dispatch} />, node);
      let expand = new Expand({
        view: view,
        content: node,
        expanded: true,
      });
      view.ui.add(expand, 'top-right');

      var creditsNode = document.createElement('div');
      ReactDOM.render(<Credits />, creditsNode);
      let credits = new Expand({
        view: view,
        content: creditsNode,
      });
      view.ui.add(credits, 'top-left');

      return () => {
        if (view) {
          // destroy the map view
          view.container = null;
        }
      };
    }
    loadWebMap();
  }, []);

  useEffect(() => {
    if (globalState?.state?.data?.length > 0) {
      const styleLayers = vtLayer?.currentStyleInfo?.style?.layers;
      styleLayers.forEach((styleLayer) => {
        const styleLayerId = styleLayer?.id;
        const styleProperties = vtLayer.getPaintProperties(styleLayerId);
        styleProperties['fill-color'] = rgbToHex(
          globalState.state.data[
            Math.floor(Math.random() * globalState.state.data.length)
          ]
        );

        vtLayer.setPaintProperties(styleLayerId, styleProperties);
      });
    }
  }, [globalState.state.data]);

  return <div style={{ height: '100%', width: '100%' }} ref={mapRef} />;
};
