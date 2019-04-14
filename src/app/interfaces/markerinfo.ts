import { Vias } from './vias';

// Class that represents every marker/point in the map
export class Markerinfo {
    nombre: string;
    latitude: number;
    longitude: number;
    telefono: string;
    visitado: boolean;
    codvia: string;
    via: Vias;
    id: string;
    images: Array<any>;

    constructor(
        nombre: string,
        latitude: number,
        longitude: number,
        codvia: string,
        id: string,
        telefono?: string,
        visitado?: string,
        via?: Vias) {
        this.nombre = nombre;
        this.latitude = latitude;
        this.longitude = longitude;
        this.telefono = telefono;
        this.visitado = false;
        this.codvia = codvia;
        this.id = id;
        this.via = via;
        this.images = [];
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

    getId(): string {
        return this.id;
    }

    setVisitado(value: boolean) {
        this.visitado = value;
    }

    setVia(nombre: Vias) {
        this.via = nombre;
    }

    getImages(){
        return this.images;
    }
}
