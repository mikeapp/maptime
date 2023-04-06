import { Vault } from "@iiif/vault";
import { getValue, createThumbnailHelper } from '@iiif/vault-helpers';
import {Canvas, ManifestNormalized, Reference} from "@iiif/presentation-3";

export class Manifest {
    uri: string;
    iiif: null | ManifestNormalized;
    json: any = {};
    vault: Vault;

    constructor(manifest: ManifestNormalized, json: {}, vault: Vault = new Vault() ){
        this.uri = manifest.id;
        this.iiif = manifest;
        this.json = json;
        this.vault = vault;
    }

    navPlace() : any | null {
        return this.json?.['navPlace'];
    }

    navDate() {
        let dateString = this.iiif?.navDate;
        let date: Date | null = null;
        if (dateString) {
            date = new Date(dateString);
        }
        return date;
    }

    navDateYear(): number | null {
        const year = this.navDate()?.getUTCFullYear();
        if (year === undefined) return null;
        return year;
    }

    label() {
        return getValue(this.iiif?.label);
    }

    async thumb(width: number): Promise<string> {
        const helper = createThumbnailHelper(this.vault);
        if (!this.iiif) return "";
        let thumbnailUri = "";
        await this.vault.loadManifest(this.uri)
            .then(async manifest => {
                const t = await helper.getBestThumbnailAtSize(manifest, { width: 256, height: 256 });
                if (t.best) thumbnailUri = t.best.id || "";
            });
        return thumbnailUri;
    }
}