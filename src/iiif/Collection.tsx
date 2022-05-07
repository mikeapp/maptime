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

    async fetch(setProgress?: (percent: number) => void) {
        let progress = 0;
        if (setProgress) setProgress(progress);
        const response = await fetch(this.uri);
        const json = await response.json();
        this.iiif = Deserialiser.parseCollection(json);
        let manifestCount = this.iiif.getManifests().length;
        this.allManifests = this.iiif.getManifests().map(m => new Manifest(m.id));
        await Promise.all(this.allManifests.map(m => m.fetch().then(() => {
            progress = progress + Math.round(100 / manifestCount)
            if (setProgress) setProgress(progress);
        })));
        return this.iiif;
    }

    manifests() {
        return this.allManifests || [];
    }

    features() {
        return this.allManifests.map( manifest => manifest.navPlace()?.['features']?.[0] ).filter( v => v !== undefined);
    }
}