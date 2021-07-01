import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import * as GeoSearch from 'leaflet-geosearch';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {


  private map: L.Map
  private centroid: L.LatLngExpression = [-26.32505,-48.83116]
  popup = L.popup();

   regIcon = L.icon({
    iconUrl: 'assets/sign-marker.png',

    iconSize:     [38, 38], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})

  constructor() { }

  ngOnInit(): void {

    this.initMap()

  }


  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 12
    })

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 5,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })

    const onMapClick = e => {
      L.marker(e.latlng, {icon: this.regIcon}).addTo(this.map).on('mouseover', onMapDblClick)
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
      x => L.marker(x as L.LatLngExpression, {icon: this.regIcon}).on('mouseover', onMapDblClick)
    ).forEach(
      x => x.addTo(this.map)
    );

    const search =  GeoSearch.GeoSearchControl({
      provider: new GeoSearch.OpenStreetMapProvider(),
      position: 'topright',
      style: 'bar',
      searchLabel: 'Pesquisar por endereço',

    });

    this.map.addControl(search);

    tiles.addTo(this.map)

    this.map.on('click', onMapClick)

  }



}
