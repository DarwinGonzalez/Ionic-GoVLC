// Class that represents a Via Object that goes inside a marker
export class Vias {
    codtipovia: string;
    codvia: string;
    codviacatastro: string;
    nomoficial: string;
    traducnooficial: string;

    constructor(codtipovia: string, codvia: string, codviacatastro: string, nomoficial: string, traducnooficial: string) {
        this.codtipovia = codtipovia;
        this.codvia = codvia;
        this.codviacatastro = codviacatastro;
        this.nomoficial = nomoficial;
        this.traducnooficial = traducnooficial;
    }

    getCodtipovia(): string {
        return this.codtipovia;
    }

    getCodvia(): string {
        return this.codvia;
    }

    getCodviacatastro(): string {
        return this.codviacatastro;
    }

    getNomoicial(): string {
        return this.nomoficial;
    }

    getTraducnooficial(): string {
        return this.traducnooficial;
    }
}
