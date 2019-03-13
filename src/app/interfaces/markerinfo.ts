export class Markerinfo {
    nombre: string;
    latitude: number;
    longitude: number;
    telefono: string;
    visitado: boolean;

    constructor(nombre: string, latitude: number, longitude: number, telefono?: string, visitado?: string) {
        this.nombre = nombre;
        this.latitude = latitude;
        this.longitude = longitude;
        this.telefono = telefono;
        this.visitado = false;
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

    getVisitado() {
        return this.visitado;
    }

    setVisitado(value: boolean) {
        this.visitado = value;
    }
}
