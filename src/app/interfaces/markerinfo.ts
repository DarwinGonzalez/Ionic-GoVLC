export class Markerinfo {
    nombre: string;
    latitude: number;
    longitude: number;
    telefono: string;

    constructor(nombre: string, latitude: number, longitude: number, telefono?: string) {
        this.nombre = nombre;
        this.latitude = latitude;
        this.longitude = longitude;
        this.telefono = telefono;
    }

    getNombre() {
        return this.nombre;
    }

    getLatitude() {
        return this.latitude;
    }

    getLongitude() {
        return this.longitude;
    }

    getTelefono() {
        return this.telefono;
    }
}
