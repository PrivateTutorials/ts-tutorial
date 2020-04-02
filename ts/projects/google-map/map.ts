import axios from 'axios';

declare const google: any;

const GOOGLE_API_KEY = 'AIzaSyA7nte23yca1OcNx9RFdH6e59Z7mgw0WT0';
type GoogleGeocodingResponseType = {
    results: { geometry: { location: { lat: number, lng: number } } }[];
    status: 'OK' | 'ZERO_RESULTS';
};

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    axios.get<GoogleGeocodingResponseType>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${GOOGLE_API_KEY}`)
        .then(response => {
            if (response.data.status !== 'OK') {
                throw new Error('NOTHING WAS FOUND');
            } else {
                const coordinates = response.data.results[0].geometry.location;
                const map = new google.maps.Map(document.getElementById('map')!, {
                    center: coordinates,
                    zoom: 8
                });
                const marker = new google.maps.Marker({position: coordinates, map: map});
            }
        }).catch(err => {
        alert(err.message); // Catching the previously thrown error: '  NOTHING WAS FOUND'
    })
}

form.addEventListener('submit', searchAddressHandler);
