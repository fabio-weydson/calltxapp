angular.module('starter.services', [])

.factory('Places', function ($rootScope) {
  
  var places = JSON.parse(localStorage.getItem('recents'));

  if(places!=null) {
    $rootScope.places = places;
  } else {
    $rootScope.places = [];
    localStorage.setItem('recents',angular.toJson($rootScope.places));
  }
  

  return {
    all: function () {
      return places;
    },
    remove: function (post) {
      places.splice(places.indexOf(post), 1);
    },
    get: function (postId) {
      for (var i = 0; i < places.length; i++) {
        if (places[i].id === parseInt(postId)) {
          return places[i];
        }
      }
      return null;
    },
    recent: function () {
      return places;
    },
    add: function(place){
      if ($rootScope.places.some(function (item) { return item.place_id == place.place_id; })) { 
        console.log('existe');
      } else {
        $rootScope.places.push(place);
      }
      this.save();
    },
    save: function(){
      localStorage.setItem('recents', angular.toJson($rootScope.places));
        this.all();
    }
  };
})

.factory('Drivers', function () {
  var drivers = [
    {
      id: 1,
      name: "João Paulo",
      plate: "GCI-3344",
      brand: "Kia Picanto",
      location: "-20.753929, -42.874088",
      distance: 2.8,
      status: "Bidding"
    },
    {
      id: 2,
      name: "Denise Soares",
      plate: "CIO 4632",
      brand: "Peugeot 206",
      location: "-20.753929, -42.874088",
      distance: 3,
      status: "Contactando"
    },
    {
      id: 3,
      name: "Karine Bezerra",
      plate: "HJK 1321",
      brand: "Toyota Corolla",
      location: "-20.753929, -42.874088",
      distance: 0.6,
      status: "Contactando"
    },
    {
      id: 4,
      name: "Rogério Silva",
      plate: "PSD 2331",
      brand: "Fiat Palio",
      location: "-20.753929, -42.874088",
      distance: 1.2,
      status: "Contactando"
    },
  ];

  return {
    all: function () {
      return drivers;
    },
    remove: function (driver) {
      drivers.splice(drivers.indexOf(driver), 1);
    },
    get: function (driverId) {
      for (var i = 0; i < drivers.length; i++) {
        if (drivers[i].id === parseInt(driverId)) {
          return drivers[i];
        }
      }
      return null;
    }
  };
})

.factory('Trips', function() {
    var trips = [
      {
        id: 1,
        from: 'Royal City',
        to: 'Vietnam - France hospital',
        time: '2016-01-02'
      },
      {
        id: 2,
        from: 'BigC',
        to: 'Phao Dai Lang',
        time: '2015-12-11'
      },
      {
        id: 3,
        from: 'Royal City',
        to: '784 Lang',
        time: '2015-11-10'
      },
      {
        id: 4,
        from: 'Royal City',
        to: 'Vietnam - France hospital',
        time: '2015-11-10'
      }
    ];

    return {
      all: function () {
        return trips;
      }
    };
})

.factory('Notifications', function () {
  var notifications = [
    {
      id: 1,
      title: "New price from Jan 2016",
      content: "",
      createdAt: "2016-02-14 12:00:00",
      read: true
    },
    {
      id: 2,
      title: "New version 1.1.1",
      content: "",
      createdAt: "2016-02-13 12:00:00",
      read: false
    },
    {
      id: 3,
      title: "New version 1.1.0",
      content: "",
      createdAt: "2016-02-12 12:00:00",
      read: false
    }
  ];

  return {
    all: function () {
      return notifications;
    },
    remove: function (notification) {
      notifications.splice(notifications.indexOf(notification), 1);
    },
    get: function (notificationId) {
      for (var i = 0; i < notifications.length; i++) {
        if (notifications[i].id === parseInt(notificationId)) {
          return notifications[i];
        }
      }
      return null;
    }
  };
})

