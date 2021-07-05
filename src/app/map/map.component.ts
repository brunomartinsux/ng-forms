import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { AntPath, antPath } from 'leaflet-ant-path'
import * as GeoSearch from 'leaflet-geosearch';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  private map: L.Map
  private centroid: L.LatLngExpression = [-26.32505,-48.83116]
  popup = L.popup()
  polygon = false
  json;

  latlngs = [];


   regIcon = L.icon({
    iconUrl: 'assets/sign-marker.png',

    iconSize:     [38, 38], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})

polyIcon = L.icon({
  iconUrl: 'assets/poly-marker.png',

  iconSize:     [18, 22], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [10, 20], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})

  constructor( private http: HttpClient ) { }

  ngOnInit(): void {

    this.initMap()
    this.getJSON()

  }


  getJSON () {

    this.http.get('assets/geojson-file.geojson').subscribe((json: any) => {
      this.json = json;
      console.log(this.json)
      L.geoJSON(this.json).addTo(this.map).on('click', this.areaClick)

    });
  }

   areaClick = e => {

    console.log(e.propagatedFrom.feature.properties)

    this.popup
    .setLatLng(e.latlng)
    .setContent(e.propagatedFrom.feature.properties.local_name + e.propagatedFrom.feature.properties.toString())
    .openOn(this.map);
  }


  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    })

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 5,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })

    const onMapClick = e => {
      console.log('Desativei os Markadores')
      // if(this.polygon) {
      //   this.latlngs.push(e.latlng)
      //   L.marker(e.latlng, {icon: this.polyIcon}).addTo(this.map)
      //   const options = { use: L.polyline, delay: 800, dashArray: [20,20], weight: 5, color: "#0000FF", pulseColor: "#FFFFFF" };
      //   const path = antPath(this.latlngs, options);
      //   path.addTo(this.map);
      // } else {
      //   L.marker(e.latlng, {icon: this.regIcon, draggable: true}).addTo(this.map).on('click', onMapDblClick)
      // }
    }
     const onMapDblClick = e => {
      this.popup
      .setLatLng(e.latlng)
      .setContent(e.latlng.toString())
      .openOn(this.map);
     }

    const jittery = Array(5).fill(this.centroid).map(
      x => [x[0] + (Math.random() - .5)/10, x[1] + (Math.random() - .5)/10 ]
    ).map(
      x => L.marker(x as L.LatLngExpression, {icon: this.regIcon, draggable: true}).on('click', onMapDblClick)
    ).forEach(
      x => {
        x.addTo(this.map)
      }
    );

    const search =  GeoSearch.GeoSearchControl({
      provider: new GeoSearch.OpenStreetMapProvider(),
      position: 'topright',
      style: 'bar',
      searchLabel: 'Pesquisar por endereço',

    });

    const polygonDraw = e => {

    }

    L.geoJSON(this.json).addTo(this.map)

    this.map.addControl(search);

    tiles.addTo(this.map)

    this.map.on('click', onMapClick)

    this.map.on('mousover', polygonDraw)

  }




}
