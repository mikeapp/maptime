import {Collection} from "../../index";
import {Vault} from "@iiif/vault";
import collectionJson from '../fixtures/collection.json';
import manifestJson from '../fixtures/manifest-1012.json';

const testFetcher = (url: string) => {
    if (url === 'https://mikeapp.github.io/manifest-fixtures/collection/rome.json') return collectionJson;
    if (url === 'https://mikeapp.github.io/manifest-fixtures/manifest/1012.json') return manifestJson;
    return fetch(url).then((r) => r.json());
}

describe("Collection", () => {
    const uri = 'https://mikeapp.github.io/manifest-fixtures/collection/rome.json';
    let c: Collection | null = null;

    beforeAll(async () => {
        const vault = new Vault({customFetcher: testFetcher});
        c = new Collection(uri, vault);
        await c.fetch();
    });

    test("loads", () => {
        expect(c?.collection).toBeDefined();
        expect(c?.collection?.id).toBe(uri);
    })

    test('loads manifests', () => {
        expect(c?.collection?.items?.length).toBe(8);
        expect(c?.allManifests?.length).toBe(8);
    });

    test('loads feature collection', () => {
        let manifest = c?.allManifests.filter(m => m.uri === 'https://mikeapp.github.io/manifest-fixtures/manifest/1012.json')[0];
        expect(manifest).toBeDefined();
        expect(manifest?.navDate()).toBeDefined();
        expect(manifest?.navPlace()).toBeDefined();
        expect(manifest?.navPlace().type).toBe('FeatureCollection');
    });

    test('selects feature collections', () => {
        expect(c?.features().length).toBe(4);
    })

    test("has a label", () => {
        expect(c?.label()).toBeDefined();
    })


})