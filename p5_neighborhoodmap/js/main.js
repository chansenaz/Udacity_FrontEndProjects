//AZ sight locations
var locations = [
    {title: 'Grand Canyon', location: {lat: 36.330019, lng: -112.114501}, wikiTag: 'Grand_Canyon'},
    {title: 'Monument Valley', location: {lat: 36.997994, lng: -110.098457}, wikiTag: 'Monument_Valley'},
    {title: 'Hoover Dam', location: {lat: 36.015996, lng: -114.736788}, wikiTag: 'Hoover_Dam'},
    {title: 'Sedona', location: {lat: 34.870416, lng: -111.762182}, wikiTag: 'Sedona,_Arizona'},
    {title: 'Havasu Falls', location: {lat: 36.255209, lng: -112.698023}, wikiTag: 'Havasu_Falls'},
    {title: 'Canyon de Chelly', location: {lat: 36.133368, lng: -109.469187}, wikiTag: 'Canyon_de_Chelly_National_Monument'},
    {title: 'Petrified Forest', location: {lat: 34.903232, lng: -109.815718}, wikiTag: 'Petrified_Forest_National_Park'},
    {title: 'Saguaro Park', location: {lat:  32.296155, lng: -111.163868}, wikiTag: 'Saguaro_National_Park'},
    {title: 'Organ Pipe Cactus', location: {lat: 32.087941, lng: -112.905837}, wikiTag: 'Organ_Pipe_Cactus_National_Monument'},
    {title: 'Tumacacori', location: {lat: 31.568076, lng: -111.048281}, wikiTag: 'Tumacácori_National_Historical_Park'},
    {title: 'Antelope Canyon', location: {lat: 36.861054, lng: -111.374716}, wikiTag: 'Antelope_Canyon'},
    {title: 'Meteor Crater', location: {lat: 35.027755, lng: -111.020149}, wikiTag: 'Meteor_Crater'},
    {title: 'Picacho Peak', location: {lat: 32.645990, lng: -111.401261}, wikiTag: 'Picacho_Peak_State_Park'},
    {title: 'O.K. Corral', location: {lat: 31.712957, lng: -110.067163}, wikiTag: 'O.K._Corral_(building)'}
];


// Model
var Location = function(data) {
  var self = this;
  self.title = data.title;
  self.location = data.location;
  self.wikiTag = data.wikiTag;
  self.show = ko.observable(true);
};



// View Model
var ViewModel = function() {
  var self = this;

  //filtering textbox
  self.query = ko.observable('');

  self.mapErrorMessage = ko.observable(false);

  //Location info brought into the view model
  self.filteredLocs = ko.observableArray();
  for (var i = 0; i < locations.length; i++) {
    var loc = new Location(locations[i]);
    self.filteredLocs.push(loc);
  }


  //Knockout computed to actively change the filtered list as the user
  //inputs a string into the text box. Any change to the text refreshes
  //the list.
  //help from https://github.com/markchen555/Neighborhood-Map-Project
  self.filterFunction = ko.computed(function() {

    //for every location, if the substring (self.query()) from the text box is found
    //within the location title, display that location in the list and on the map
    for (var i = 0; i < self.filteredLocs().length; i++) {
      if (self.filteredLocs()[i].title.toLowerCase().indexOf(self.query()) >= 0) {
        self.filteredLocs()[i].show(true);
        if (self.filteredLocs()[i].marker) {
          self.filteredLocs()[i].marker.setVisible(true);
        }

    //if the location is not found, do not display it in the list or on the map
      } else {
        self.filteredLocs()[i].show(false);
        if (self.filteredLocs()[i].marker) {
          self.filteredLocs()[i].marker.setVisible(false);
        }
      }
    }
  });

  //when the user clicks on a location, trigger showInfo
  self.showInfo = function(locations) {
    google.maps.event.trigger(locations.marker, 'click');
  };
};




//Create our map variable
var map;

// Create a new blank array for all the location markers.
var markers = [];


function initMap() {
  // Constructor creates a new map
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 34.4,
      lng: -111.7
    },
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    mapTypeControl: true
  });

  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < viewModel.filteredLocs().length; i++) {
    // For each location, get the position, title, and wiki tag from the filteredLocs array.
    var position = viewModel.filteredLocs()[i].location;
    var title = viewModel.filteredLocs()[i].title;
    var wikiTag = viewModel.filteredLocs()[i].wikiTag;

    //regular icons are yellow, highlighted icons are red. icons will be highlighted on mouseover
    var regIcon = makeMarkerIcon('yellow');
    var highlightedIcon = makeMarkerIcon('red');

    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      wikiTag: wikiTag,
      icon: regIcon,
      highlightedIcon: highlightedIcon,
      defaultIcon: regIcon,
      animation: google.maps.Animation.DROP,
      id: i
    });

    // Push the marker to our array of markers.
    viewModel.filteredLocs()[i].marker = marker;
    markers.push(marker);

    // Create an onclick event to create a bouncing animation and
    // open an infowindow at each marker.
    marker.addListener('click', function() {

      //Set Animation on marker and set it to stop after 700ms (exactly 1 bounce)
      var self = this;
      self.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        self.setAnimation(null);
      }, 700);

      //Open information window
      populateInfoWindow(this, largeInfowindow);
    });

    //extend our bounds for each marker
    bounds.extend(markers[i].position);

    //when the user mouses over a location, highlight that flag
    marker.addListener('mouseover', function() {
      this.setIcon(this.highlightedIcon);
    });

    //when the user is no longer hovering their cursor over a location, un-highlight that flag
    marker.addListener('mouseout', function() {
      this.setIcon(this.defaultIcon);
    });
  }

  // Extend the boundaries of the map for each marker
  map.fitBounds(bounds);
}



// This function takes in a color and then creates a new marker icon of that color
function makeMarkerIcon(color) {
  var markerImage = new google.maps.MarkerImage('img/' + color + 'flag' + '.png',
    new google.maps.Size(64, 64),
    new google.maps.Point(0, 0),
    new google.maps.Point(32, 64),
    new google.maps.Size(64, 64));
  return markerImage;
}


//Display the infowindow when a marker is clicked. Only one infowindow will be displayed
//at a time.
//help from https://github.com/Christianq010/Neighborhood-Map-Master
function populateInfoWindow(marker, infowindow) {
  //Make sure the infowindow is not already opened at this marker
  if (infowindow.marker != marker) {
    infowindow.marker = marker;

    //link to the wikipedia article for this location that the user may click
    var wikiReference = 'https://en.wikipedia.org/wiki/' + marker.wikiTag;

    //url to be used by ajax request to get thumbnail and first piece of text from wiki article (called extract in wikipedia API)
    var extractURL = 'http://en.wikipedia.org/w/api.php?action=query&prop=pageimages|extracts&exintro=&explaintext=&format=json&pithumbsize=150&titles=' + marker.wikiTag

    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        data: {},
        url: extractURL
    }).done(function (response) {
        console.log(marker);

        //content of first part of wiki article (aka extract)
        var wikiDescription = response.query.pages[Object.keys(response.query.pages)[0]].extract;

        //thumbnail url at 150px big
        var wikiImageURL = response.query.pages[Object.keys(response.query.pages)[0]].thumbnail.source;

        //if extract is too long, trim it and add ellipsis
        if (wikiDescription.length > 550) {
          wikiDescription = wikiDescription.substr(0,550) + '...';
        }

        //display thumbnail and extract side by side in infowindow
        infowindow.setContent("<div><p><img src='" + wikiImageURL + "' align='left' />" + wikiDescription + "</p><br>(Source: <a href=" + wikiReference + ">Wikipedia)</a> </div>");

        //error message if ajax request fails
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        infowindow.setContent('<div>' + 'There was a problem with Wikipedia. Try again later!' + '</div>');
    });

    //display infowindow
    infowindow.open(map, marker);

    //user can close the infowindow
    infowindow.addListener('closeclick', function() {
      infowindow.setMarker = null;
    });
  }

/*



  */
}



var viewModel = new ViewModel();
ko.applyBindings(viewModel);

function mapError() {
  viewModel.mapErrorMessage(true);
  alert('There was a problem with Google Maps :(');
}
