// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("App JS imported successfully!");
});

(function () {
  let map;
  const mapEL = document.getElementById("map");
  function initMap() {
    if (navigator.geolocation && mapEL) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        const currentLocation = { lat: latitude, lng: longitude };

        // initialize the map
        map = new google.maps.Map(mapEL, {
          center: currentLocation,
          zoom: 15
        });

        // get the nearby places
        const places = new google.maps.places.PlacesService(map);
        places.nearbySearch(
          {
            location: currentLocation, // current location
            radius: 1000, // 1000 meters
            type: ["restaurant"],
            fields: ['formatted_phone_number']
          },
          (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              results.forEach(place => {
                // display the marker
                displayMarker(place);
              });
            }
          }
        );
        // display the marker
        const displayMarker = (location) => {
          let marker;
          marker = new google.maps.Marker({
            position: location.geometry.location,
            map: map,
            title: location.name,
          });
          marker.addListener("click", () => {
            const infowindow = new google.maps.InfoWindow();
            const content = displayRestaurantPopup(location);
            infowindow.setContent(content);
            infowindow.open(map, marker);
            getFormattedPhoneNumber(location.place_id);
          });
        };
      });
    }
  }

  const displayRestaurantPopup = (location) => {
    return `
      <div id=${location.place_id} style="max-width:200px">
        <h5>${location.name}</h5> 
        <div class="images">
          ${location?.photos?.length ?
        location?.photos?.map(photo => `<a href=${photo.getUrl()} target="_blank"><img src="${photo.getUrl()}" alt="${location.name}" width="50px"></a>`).join("") : ''}
        </div>
        <p style="margin-top:5px;" class="mb-0">${location?.vicinity}</p>
      </div>
    `;
  }

  const getFormattedPhoneNumber = (placeId) => {
    setTimeout(() => {
      const popup = document.querySelectorAll(`#${placeId}`);
      if (popup) {
        const service = new google.maps.places.PlacesService(map);
        service.getDetails({
          placeId: placeId,
          fields: ['formatted_phone_number']
        }, (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (place.formatted_phone_number) {
              const contactNo = document.createElement("p");
              contactNo.style.marginTop = "5px";
              contactNo.innerHTML = `<b>Contact</b>: ${place.formatted_phone_number}`;
              popup[0].appendChild(contactNo);
            }
          }
        });
      }
    }, 100);
  }

  // initialize the map
  initMap();


})();