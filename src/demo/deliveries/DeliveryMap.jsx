import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import React, { useEffect, useRef, useState } from 'react';
import {  getOriginCoords } from '../orders/api';
import { getDirections } from './directions';


mapboxgl.accessToken = 'pk.eyJ1IjoiZXJpY3lhcmhhbSIsImEiOiJjbGVtdWN2MHIwMDE2M3hsazA2aGt0YXN3In0.62ElsBzews_TTWShyekDUQ';

const DeliveryMap = ({ destinationArr }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-81.577167);
  const [lat, setLat] = useState(41.508132);
  const [zoom, setZoom] = useState(11);
  const [destinations, setDestinations] = useState([])

  useEffect(() => {
    const destinations = destinationArr;
    setDestinations(destinations);
  }, [destinationArr])


  useEffect(() => {
    if (!map.current || !destinations || destinations.length < 1) return; // wait for map to initialize

    const addPinsToMap = (coordsArr) => {
      const pointFeatures = coordsArr.map(getFeature)
      const pointFeatureColl = {
        type: 'FeatureCollection',
        features: pointFeatures
      };
      if (map.current.getLayer('end')) {
        map.current.getSource('end').setData(pointFeatureColl);
      } else {
        map.current.addLayer({
          id: 'end',
          type: 'circle',
          source: {
            type: 'geojson',
            data: pointFeatureColl
          },
          paint: {
            'circle-radius': 10,
            'circle-color': '#f30'
          }
        });
      }
    }
    const eff = async () => {
      const data = await getDirections(getOriginCoords(), destinations);
      const coordinates = data.routes[0].geometry.coordinates;
      addRouteToMap(coordinates)
      addPinsToMap(data.waypoints);
    }
    eff();
  }, [destinations])

  const addRouteToMap = (coordinates) => {
    const geojson = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: coordinates
      }
    };
    map.current.addLayer({
      id: 'route',
      type: 'line',
      source: {
        type: 'geojson',
        data: geojson
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3887be',
        'line-width': 5,
        'line-opacity': 0.75
      }
    });
  }

  const getFeature = geometry => {
    const feature = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: geometry.location
      }
    }
    return feature
  }


  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  )
}

export default DeliveryMap