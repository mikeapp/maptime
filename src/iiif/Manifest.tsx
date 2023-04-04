import { Vault } from "@iiif/vault";
import { getValue, createThumbnailHelper } from '@iiif/vault-helpers';
import {Canvas, ManifestNormalized, Reference} from "@iiif/presentation-3";

export class Manifest {
    uri: string;
    iiif: null | ManifestNormalized;
    json: any = {};

    constructor(manifest: ManifestNormalized, json: {} ){
        this.uri = manifest.id;
        this.iiif = manifest;
        this.json = json;
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

    thumb(width: number): string {
        const canvas = this?.json['items'][0];
        const alist  = canvas['items'][0];
        const anno = alist['items'][0];
        const service = anno['body']['service'][0];
        const id: string = service['id'] || service['@id'] !;
        const url = id + "/full/" + width + ",/0/default.jpg";
        return url;
    }
}