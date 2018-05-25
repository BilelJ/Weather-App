
var placeSearch, autocomplete;

    function initAutocomplete() {
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new google.maps.places.Autocomplete(
          /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
          {types: ['geocode']});
      }



function unitConvert(){
     var degreeValue=document.getElementById('cf').innerHTML;
     var temperature=document.getElementById('temperature').innerHTML;
     degreeValue=parseFloat(degreeValue).toFixed(2);
     var type = document.getElementById('cf').getAttribute('title');
     if (type=="celcius"){
      degreeValue = ((degreeValue*1.8)+32).toFixed(2);
      document.getElementById('temperature').innerHTML = '<span id=cf title="fahrenheit">'+degreeValue+'</span>&#8457;';
    } else {
      degreeValue = ((degreeValue-32)/1.8).toFixed(2);

      document.getElementById('temperature').innerHTML = '<span id=cf title="celcius">'+degreeValue+'</span>&#8451;';
    }

  }

  function fetchWeather(lat,lng){
    var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&units=metric&appid=2b9d071ba46e1cbe3bf1a9dfb5c27866";
    $.get({url: weatherUrl})
    .done(function(weatherData){
      var icon = weatherData.weather[0].icon;
      icon="<br /><img alt="+weatherData.weather[0].description+" src="+"http://openweathermap.org/img/w/"+icon+".png>";
      $("#userLocation").html(weatherData.name+", "+weatherData.sys.country);
      $("#weatherStatus").html(weatherData.weather[0].description+icon);
      $("#temperature").html('<span id=cf title="celcius">'+weatherData.main.temp+'</span>&#8451;');
      switch(weatherData.weather[0].main){
        case "Clear":
        $('body').fadeOut(500).removeClass().addClass("clear").fadeIn(500);
        break;
        case "Atmosphere":
        $('body').fadeOut(500).removeClass().addClass("fog").fadeIn(500);
        break;
        case "Rain":
        $('body').fadeOut(500).removeClass().addClass("rain").fadeIn(500);
        break;
        case "Thunder":
        $('body').fadeOut(500).removeClass().addClass("thunder").fadeIn(500);
        break;
        case "Drizzle":
        $('body').fadeOut(500).removeClass().addClass("drizzle").fadeIn(500);
        break;
        case "Snow":
        $('body').fadeOut(500).removeClass().addClass("snow").fadeIn(500);
        break;
        case "Clouds":
        $('body').fadeOut(500).removeClass().addClass("cloud").fadeIn(500);
        break;
        default: $('body').fadeOut(500).removeClass().addClass("fog").fadeIn(500);
      }

    });
  }


  navigator.geolocation.getCurrentPosition(showPosition);

  function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    $("#lat").html(lat);
    $("#lng").html(lng);
    fetchWeather(lat,lng);


  }



  $("#button").click(function(){
    var city = document.getElementById('autocomplete').value;
    var fetchUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address="'+city+'&key=AIzaSyCVJ00UhKBD0sXyypNuDfCZpq9SHMAzm0k';
    $.get({
      url: fetchUrl,
    })
    .done(function( data ) {
      var lat = data.results[0].geometry.location.lat;
      $("#lat").val(lat);
      var lng = data.results[0].geometry.location.lng;
      $("#lng").val(lng);
        //Show result on the page
        fetchWeather(lat,lng);

      });
  });

