import {Deserialiser, Manifest as ManifestoManifest, Thumb, Utils} from "manifesto.js";

export class Manifest {
    uri: string;
    iiif: null | ManifestoManifest;
    json: any = {};

    constructor(uri: string) {
        this.uri = uri;
        this.iiif = null;
    }

    async fetch() {
        const response = await fetch(this.uri);
        const json = await response.json();
        this.iiif = Deserialiser.parseManifest(json);
        this.json = json;
        return this.iiif;
    }

    navPlace() {
        return this.json['navPlace'];
    }

    navDate() {
        let dateString = this.json['navDate'];
        let date: Date | null = null;
        if (dateString) {
            date = new Date(dateString);
        }
        return date;
    }

    label() {
        let label = this.iiif?.getDefaultLabel();
        if (typeof(label) === 'string') {
            return label;
        } else {
            return "";
        }
    }

    thumb(width:number) {
        const canvas = this.iiif?.getSequenceByIndex(0).getCanvases()[0];
        if (canvas) {
            // This fails for Princeton manifests
            let thumb = new Thumb(width, canvas);
            if (thumb.uri.startsWith('http')) return thumb.uri;
            // Get thumb
            let id = canvas.getContent()[0].__jsonld['body']['service'][0].id
            return id + "/full/" + width + ",/0/default.jpg";
        }
    }
}