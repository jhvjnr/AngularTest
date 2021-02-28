import { AfterViewInit, Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import * as THREE from 'three';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent implements AfterViewInit{
  public forecasts: WeatherForecastVO[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    let body = JSON.stringify({ "key": "I made a post request" });
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', "Accept":"text/plain" });
    let options = { headers: headers };

    http.post<WeatherForecastVO[]>(baseUrl + 'all-forecasts', body, options).subscribe(result => {
      console.warn(result);
      this.forecasts = result;
    }, error =>
      {
        console.warn("We hit an error: ");
        console.error(error);
    });



    http.post<RequestVO>(baseUrl + 'request-vo', body, options).subscribe(result => {
      console.warn(result);
    }, error => {
      console.warn("We hit an error");
      console.error(error);
    });

    
  }
  
  
  ngAfterViewInit(): void {
    this.renderCube();
  }

  renderCube() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    let canvas = document.getElementById("paintOnMe");
    canvas.replaceWith(renderer.domElement);
    //document.body.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame( animate );

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render( scene, camera );
    };

    animate();
  } ;


}

interface WeatherForecastVO {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface RequestVO {
  key: string;
}
