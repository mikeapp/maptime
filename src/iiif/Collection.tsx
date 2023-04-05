import { Vault } from "@iiif/vault";
import { CollectionNormalized } from "@iiif/presentation-3";
import { Manifest } from "./Manifest";
import {getValue} from "@iiif/vault-helpers";

export class Collection {
    uri: string;
    collection: CollectionNormalized | null;
    allManifests: Manifest[] = [];
    vault: Vault;

    constructor(uri: string, vault = new Vault()) {
        this.uri = uri;
        this.collection = null;
        this.vault = vault;
    }

    async fetch(setProgress?: (percent: number) => void):  Promise<CollectionNormalized | null> {
        let progress = 0;
        let jsonDocs: any[] = [];
        if (setProgress) setProgress(progress);
        await this.vault.loadCollection(this.uri).then((cn) => this.collection = cn!);
        const ids = this?.collection?.items?.map(item => item.id) || [];
        for (let i = 0; i < ids.length; i++) {
            await fetch(ids[i]).then(r => r.json()).then(doc => {
                jsonDocs[i] = doc;
                return this.vault.loadManifest(ids[i], doc);
            }).then(mn => this.allManifests.push(new Manifest(mn!, jsonDocs[i])));
        }
        return this.collection
    }

    label() {
        return getValue(this.collection?.label);
    }

    manifests() {
        return this.allManifests;
    }

    features() {
        return this.allManifests.map( manifest => manifest.navPlace()?.['features']?.[0] ).filter( v => v !== undefined);
    }
}