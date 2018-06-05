window.onload = minhalocalizacao;

var mapa;
var infoWindow;

function minhalocalizacao() {
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pegalocalizacao);
}else{
    alert("No support geolocation")
}
}

function pegalocalizacao(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var latlng = new google.maps.LatLng(latitude,longitude);

    mostramapa(latlng);

    pegalugares(latlng);

    criaolocalstorage(latlng);

}

function mostramapa(latlng) {
    var criamapa = {
        center: latlng,
        zoom: 18,
    }
mapa = new google.maps.Map(document.getElementById('map'),criamapa);
infoWindow = new google.maps.InfoWindow({
    content: 'Actual position',
    position: latlng,
    map: mapa,  
});

}

function pegalugares(latlng) {
    var proximos = new google.maps.places.PlacesService(mapa);

    var lugar = {
        location: latlng,
          radius: 1000,
          type: ['bank']
    };

    proximos.nearbySearch(lugar, pesquisaproximo);
}    

function pesquisaproximo(results,status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var opcoes = results[i];
          criamarcador(opcoes.geometry.location, opcoes)
        }
      }
}

function criamarcador(latlng,placeResult) {
    var marcadorstyle = {
        position:latlng,
        map:mapa,
        animation: google.maps.Animation.DROP,
        clickable:true
    }
    var marcador = new google.maps.Marker(marcadorstyle);
}
function criaolocalstorage(latlng) {
    var dados = {
        ultimaposicao: latlng,

    }
    window.localStorage.setItem('dados', JSON.stringify(dados));
    
}