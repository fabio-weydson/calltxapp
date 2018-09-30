angular.module('starter.controllers', [])

// Home controller
.controller('HomeCtrl', function($scope, $state, $rootScope, $ionicPopup, $timeout) {
    
    $scope.stars = [0, 0, 0, 0, 0];
    $rootScope.pos = {};    
    $scope.drive_tta = '3 minutos'; 
    $rootScope.driver_active = false;
    $scope.showPlaces = false;
    
    $scope.cancel = function () {
        $rootScope.driver_active = false;
        $rootScope.tracking = false;
        // go to tracking state
        $state.reload() 
    };


    $scope.rate = function(value){
        console.log(value);
    }

    $scope.default_places = function(){
        $rootScope.departue = {
            place_id: 0,
            name: "Minha localização atual",
            formatted_address: "",
            LatLng: '',
            distance: 0
        };
    
        $rootScope.destination = {
            place_id: 1,
            name: "Para onde deseja ir?",
            formatted_address: "",
            LatLng: '',
            distance: 0
        };
    }
    
    
    $scope.default_places();
    $scope.mudaDestino = function(e){
        if($rootScope.tracking) {
            alert("Cancele a corrida antes de inserir outro destino.");
        } else {
            $state.go('places_destination');
        }
    }
 

  // map height
  $scope.mapHeight = window.screen.height+50;

  // show - hide booking form
  $scope.showForm = false;

  // show - hide modal bg
  $scope.showModalBg = false;

  // toggle form
  $scope.toggleForm = function() {
    $scope.showForm = !$scope.showForm;
    $scope.showModalBg = ($scope.showForm == true);
  }

  // list vehicles
  $scope.vehicles = [
    {
      id:1,
      name: 'Comum',
      icon: 'icon-taxi',
      active: true
    },
    {
      id:2,
      name: '7 Lugares',
      icon: 'icon-car',
      active: false
    }
  ]

  // Note to driver
  $scope.note = '';

  // Promo code
  $scope.promo = '';

  // toggle active vehicle
  $scope.toggleVehicle = function(index) {
    for (var i = 0; i < $scope.vehicles.length; i++) {
      $scope.vehicles[i].active = (i == index);
    }
  }
  $rootScope.pos = {
    lat: -20.755986,
    lng: -42.876664
  };
  function initialize(pos) {
    $scope.markers = [];

    $rootScope.departue.LatLng = pos.lat+','+pos.lng;
    localStorage.setItem('last_location', $rootScope.departue.LatLng);
    // set option for map
    var mapOptions = {
      center: {
        lat: pos.lat,
        lng: pos.lng
      },
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#7c93a3"},{"lightness":"-10"}]},{"featureType":"administrative.country","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"color":"#a0a4a5"}]},{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"color":"#62838e"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"off"},{"lightness":"-29"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#dde3e3"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"geometry.stroke","stylers":[{"color":"#3f4a51"},{"weight":"0.30"},{"visibility":"on"},{"lightness":"74"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.place_of_worship","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#bbcacf"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"lightness":"0"},{"color":"#bbcacf"},{"weight":"0.50"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#a9b4b8"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"invert_lightness":true},{"saturation":"-7"},{"lightness":"3"},{"gamma":"1.80"},{"weight":"0.01"}]},{"featureType":"road.local","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"transit.station.bus","elementType":"all","stylers":[{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#a3c7df"}]}]
    };
    // init map
    $scope.map = new google.maps.Map(document.getElementById("map"),
      mapOptions);
      angular.extend($scope.map,{
        pv: {
            markerArray: [],
            removeAllMarkers: function(){
                for (var i = 0; i < this.markerArray.length; i++) {
                    if (this.markerArray[i].directions) this.markerArray[i].directions.setMap(null);
                    this.markerArray[i].setMap(null);
                }
            },
            removeAllDirections: function(){
                for (var i = 0; i < this.markerArray.length; i++) {
                    if (this.markerArray[i].directions) this.markerArray[i].directions.setMap(null);
                }
            },
            geocoder: new google.maps.Geocoder(),
            directions: new google.maps.DirectionsService(),
            center: null
        }
    });


    var bounds = new google.maps.LatLngBounds();
    var points = [ new google.maps.LatLng(pos) ];
    if($scope.my_location) {
        // Extend bounds with each point
        for (var i = 0; i < points.length; i++) {
        var marker = new google.maps.Marker({position: points[i], map: $scope.map,  icon: 'img/current_pos.png'});
        }
        $scope.markers.push(marker);
    }
    $timeout(function(){
        $scope.showPlaces = true;
    },1000)
   
    //http://www.myiconfinder.com/uploads/iconsets/48-48-32c51ea858089f8d99ae6a1f62deb573.png


    // get ion-view height
    var viewHeight = window.screen.height - 44; // minus nav bar
    // get info block height
    var infoHeight = document.getElementsByClassName('booking-info')[0].scrollHeight;
    // get booking form height
    var bookingHeight = document.getElementsByClassName('booking-form')[0].scrollHeight;
    // set map height = view height - info block height + booking form height

    //$scope.mapHeight = viewHeight - infoHeight + bookingHeight;
    

  }
  if($rootScope.tracking==true){
    if(($rootScope.departue.LatLng)&&($rootScope.destination.LatLng)) {
        calcRoute();
      }
  } else {
      console.log('cancela rota');
  }
 

  $scope.$watchGroup(['departue', 'destination'], function() {
    if(($rootScope.departue.LatLng)&&($rootScope.destination.LatLng)) {
      calcRoute();
    }
  });
  
  function calcRoute() {
      // First, remove any existing markers from the map. 
      $scope.map.pv.removeAllMarkers();
    $timeout(function(){
      $scope.rota_ok = true;
    },1000)
    
  if ($scope.directionsDisplay != null) {
      $scope.directionsDisplay.setMap(null);
      $scope.directionsDisplay = null;
  } 

  $scope.directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true, polylineOptions: { strokeColor: "#00000" } });
  $scope.directionsService = new google.maps.DirectionsService();
   
      var departue = $rootScope.departue.LatLng.split(',');
      var destination = $rootScope.destination.LatLng.split(',');
      //console.log(destination);
    var start = new google.maps.LatLng(departue[0],departue[1]);
    var end = new google.maps.LatLng(destination[0],destination[1]);
    var service = new google.maps.DistanceMatrixService();
   
  service.getDistanceMatrix({
    origins: [$rootScope.departue.LatLng],
    destinations: [$rootScope.destination.LatLng],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC
  }, function (results) {
     //results.identifier = identifier;
     $scope.route_distance = results.rows[0].elements[0].distance.text;
     $scope.route_eta = results.rows[0].elements[0].duration.text;
     console.log($scope.route_distance,$scope.route_eta)
  });
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(start);
    bounds.extend(end);
    $scope.map.fitBounds(bounds);
    var request = {
        origin: start,
        destination: $rootScope.destination.LatLng,
        travelMode: google.maps.TravelMode.DRIVING
    };
  
    $scope.directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            for (var i = 0; i < $scope.markers.length; i++) {
                $scope.markers[i].setMap(null);
            }
          $scope.directionsDisplay.setDirections(response);
          var leg = response.routes[ 0 ].legs[ 0 ];
          new google.maps.Marker({position:leg.start_location, map:$scope.map, icon:'img/bluedot-icon.png'});
          new google.maps.Marker({position:leg.end_location, map:$scope.map, icon:'img/reddot-icon.png'});
          $scope.directionsDisplay.setMap($scope.map);
             
        } else {
            alert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
        }  
    });
    
}
    $scope.$on('$ionicView.enter', function(){
        if($rootScope.tracking==true) {
            $timeout(function(){
              $scope.showRating();
              
            },5000)
        } else {
            
        }
    
    });
  function getUserLocation(){
     
         navigator.geolocation.getCurrentPosition(function(position) {
             
             $scope.my_location = true;
          $rootScope.pos = {
             lat: position.coords.latitude,
             lng: position.coords.longitude
           };
           initialize($rootScope.pos);
           
         },function (error) {
            $scope.my_location = false;
            alert("Não foi possivel obter sua localização. Certifique-se de ligar seu GPS.")
            $rootScope.pos = {
                lat: -20.755986,
                lng: -42.876664
              };
              initialize($rootScope.pos);
        },{enableHighAccuracy: true, maximumAge:0, timeout:5000});
   }
   
  // load map when the ui is loaded
  $scope.$on('$ionicView.enter', getUserLocation());


  // Show note popup when click to 'Notes to driver'
  $scope.showNotePopup = function() {
    $scope.data = {}

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/popup-note.html',
      title: 'Observações ao motorista',
      scope: $scope,
      buttons: [
        { text: 'Cancelar' },
        {
          text: '<b>Enviar</b>',
          type: 'button-balanced',
          onTap: function(e) {
            if (!$scope.data.note) {
              //don't allow the user to close unless he enters note
              e.preventDefault();
            } else {
              return $scope.data.note;
            }
          }
        },
      ]
    });
    myPopup.then(function(res) {
      $scope.note = res;
    });
  };

  // Show promote code popup when click to 'Promote Code'
  $scope.showPromoPopup = function() {
    $scope.data = {}

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/popup-promo.html',
      title: 'Cupom de Desconto',
      scope: $scope,
      buttons: [
        { text: 'Cancelar' },
        {
          text: '<b>Aplicar</b>',
          type: 'button-balanced',
          onTap: function(e) {
            if (!$scope.data.promo) {
              //don't allow the user to close unless he enters note
              e.preventDefault();
            } else {
              return $scope.data.promo;
            }
          }
        },
      ]
    });
    myPopup.then(function(res) {
      $scope.promo = res;
    });
  };

  // go to next view when the 'Book' button is clicked
  $scope.book = function() {
    $state.go('finding');
  }

  $scope.showRating = function() {

    $scope.data = {
      stars: $scope.stars
    }

    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      templateUrl: 'templates/popup-rating.html',
      title: 'Você chegou!',
      scope: $scope,
      buttons: [
        {
          text: '<b>Avaliar</b>',
          type: 'button-balanced',
          onTap: function(e) {
            if (!$scope.data.stars) {
              //don't allow the user to close unless he enters note
              e.preventDefault();
            } else {
              return $scope.data.stars;
            }
          }
        },
      ]
    });
    myPopup.then(function(res) {
      // save rating here
      $scope.cancel();
    });
  }

})

// Places Controller
.controller('PlacesCtrl', function($scope, $rootScope, $state, Places,googleAutocompleteService) {
  // set list places
  $scope.data = {};
  if(typeof $rootScope.departue == 'undefined') {
    $rootScope.departue = {
      place_id: 0,
      name: "Minha localização atual",
      formatted_address: "",
      LatLng: localStorage.getItem('last_location'),
      distance: 0
    };
  }

  
  
  //Optional
  $scope.countryCode = 'BR';
  $scope.radius = '1000';
  $scope.language = 'pt-BR';

  $scope.rad = function(x) {
    return x * Math.PI / 180;
  };
  
  $rootScope.getDistance = function(end) {
   
    if($rootScope.departue.LatLng) {
    var p1 = $rootScope.departue.LatLng.split(',');
    var p2 = end.LatLng.split(',');
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = $scope.rad(p2[0] - p1[0]);
    var dLong = $scope.rad(p2[1] - p1[1]);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos($scope.rad(p1[0])) * Math.cos($scope.rad(p2[0])) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return Math.floor((d/1000)); // returns the distance in meter
    } else {
      return 0;
    }
  }
  //Optional
  $scope.onAddressSelection = function (location,method) {
    if(location=='current_location') {
      $rootScope.departue = {
        place_id: 0,
        name: 'Meu local atual',
        icon: '',
        formatted_address: '',
        LatLng: $rootScope.pos.lat+','+$rootScope.pos.lng,
        distance: 0
      }
    } else {
      if(method=='origin') {
        $rootScope.departue = {
            place_id: location.place_id,
          name: location.name,
          icon: location.icon,
          formatted_address: location.formatted_address,
          LatLng: location.LatLng,
          distance: 0
        }
        Places.add($rootScope.departue);
      } else if(method=='destination'){
        $rootScope.destination = {
          place_id: location.place_id,
          name: location.name,
          icon: location.icon,
          formatted_address: location.formatted_address,
          LatLng: location.LatLng,
          distance: 0
        }
        Places.add($rootScope.destination);
      } 
    }
    //console.log(location)
    //console.log($rootScope.departue);
    $state.go('home', {trace_route:'yes'});

  };
  $scope.places = Places.all();

  // list recent places
  $scope.recentPlaces = Places.recent();
})

// Finding controller
.controller('FindingCtrl', function($scope, Drivers, $state) {
  // get list of drivers
  $scope.drivers = Drivers.all();

  // start on load
  $scope.init = function() {
    setTimeout(function() {
        $scope.choosen = 1;
      }, 2000);
    setTimeout(function() {
      $state.go('driver');
    }, 4000)
  }
})

// Driver controller
.controller('DriverCtrl', function($scope, $rootScope, Drivers, $state,$ionicHistory) {
  // get driver profile
  // change driver id here
  $scope.driver = Drivers.get(1);
  $ionicHistory.nextViewOptions({
    disableBack: true
  });

  // go to tracking screen
  $scope.track = function () {
    $rootScope.driver_active = $scope.driver;
    $rootScope.tracking = true;
    // go to tracking state
    $state.go('home', null, {
        location: 'replace'
    })
  };
  $scope.cancel = function () {
    $rootScope.driver_active = false;
    $rootScope.tracking = false;
    // go to tracking state
    $state.go('home');
    };
})

// History controller
.controller('HistoryCtrl', function($scope, Trips) {
  // get list of trips from model
  $scope.records = Trips.all();
})

// Notification controller
.controller('NotificationCtrl', function($scope, Notifications) {
  // get list of notifications from model
  $scope.notifications = Notifications.all();
})

// Support controller
.controller('SupportCtrl', function($scope) {})

// Profile controller
.controller('ProfileCtrl', function($scope) {
    $scope.navega = function(local){
        alert("Você ainda não cadastrou seus locais favoritos");
    }
  
 // user data
    $scope.user = {
      name: "Carlos Machado",
      profile_picture: "img/default-avatar.png",
      phone: "+31 9 8862 6564",
      email: "calltaxi@calltaxi.com.br",
      user_addresses: {
        home:{
            formatted_address: 'Rua das Flores, 321',
            lat:'',
            lng: ''
        },
        work:{
            formatted_address: 'Rua Benjamin Araújo, 44',
            lat:'',
            lng: ''
        },
        other:{
            formatted_address: '',
            lat:'',
            lng: ''
        }
      }
    }
})

// Authentication controller
// Put your login, register functions here
.controller('AuthCtrl', function($scope, $state, $ionicHistory,$timeout) {
    $timeout(function(){
        $scope.exibeLogin = true;
    },2000)
  // hide back butotn in next view
  $ionicHistory.nextViewOptions({
    disableBack: true
  });
  $scope.login = function(){
      $state.go("home");
  }
})
