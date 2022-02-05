import {Collection as ManifestoCollection, Deserialiser, Utils} from "manifesto.js";
import {Manifest} from "./Manifest";

export class Collection {
    uri: string;
    iiif: null | ManifestoCollection;
    allManifests: Manifest[] = [];

    constructor(uri: string) {
        this.uri = uri;
        this.iiif = null;
    }

    async fetch() {
        const response = await fetch(this.uri);
        const json = await response.json();
        this.iiif = Deserialiser.parseCollection(json);
        this.allManifests = this.iiif.getManifests().map( m => new Manifest(m.id));
        await Promise.all(this.allManifests.map(m => m.fetch()));
        return this.iiif;
    }

    manifests() {
        return this.allManifests || [];
    }

    features() {
        return this.allManifests.map( manifest => manifest.navPlace()?.['features']?.[0] ).filter( v => v !== undefined);
    }

}