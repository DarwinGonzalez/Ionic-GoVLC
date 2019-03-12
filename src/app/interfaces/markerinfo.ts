export class Markerinfo {
    nombre: string;
    latitude: number;
    longitude: number;

    constructor(nombre: string, latitude: number, longitude: number) {
        this.nombre = nombre;
        this.latitude = latitude;
        this.longitude = longitude
    }

    getNombre() {
        return this.nombre;
    }

    getLatitude() {
        return this.latitude
    }

    getLongitude() {
        return this.longitude;
    }
}
