import { Vias } from './vias';

export class Markerinfo {
    nombre: string;
    latitude: number;
    longitude: number;
    telefono: string;
    visitado: boolean;
    codvia: string;
    via?: Vias;

    constructor(nombre: string, latitude: number, longitude: number, codvia: string,  telefono?: string, visitado?: string, via?: Vias) {
        this.nombre = nombre;
        this.latitude = latitude;
        this.longitude = longitude;
        this.telefono = telefono;
        this.visitado = false;
        this.codvia = codvia;
        this.via = via;
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

    getCodvia(): string {
        return this.codvia;
    }

    setVisitado(value: boolean) {
        this.visitado = value;
    }

    setVia(nombre: Vias) {
        this.via = nombre;
    }
}
