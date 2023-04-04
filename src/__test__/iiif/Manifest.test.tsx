import {Manifest} from "../../index";
import {Vault} from "@iiif/vault";
import manifestJson from '../fixtures/manifest-1012.json';
import {
    Canvas,
    ManifestNormalized,
    AnnotationBody,
    Annotation,
    AnnotationPage,
    Service,
    ImageService
} from "@iiif/presentation-3";
import {createThumbnailHelper} from "@iiif/vault-helpers";

describe("Manifest", () => {

    const vault = new Vault();
    const id = "https://mikeapp.github.io/manifest-fixtures/manifest/1012.json";
    let manifestNormalized: ManifestNormalized;
    let manifest: Manifest;

    beforeAll(async() => {
        await vault.loadManifest(manifestJson).then( m => manifestNormalized = m!);
        manifest = new Manifest(manifestNormalized, manifestJson);
    })

    test("loads manifest", () => {
        expect(manifestNormalized.id).toBe(id);
        expect(manifest.uri).toBe(id);
    })

    test("computes thumbnail", async() => {
        console.log( manifest.thumb(500));
    })

});

