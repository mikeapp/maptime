# MapTime

A React component that displays a [IIIF Presentation API](https://iiif.io/api/presentation/3.0/) [Collection](https://iiif.io/api/presentation/3.0/#51-collection) with a map and timeline. This is currently a work in progress.

A [live demo](https://mikeapp.github.io/maptime-demo/?collection=https://mikeapp.github.io/manifest-fixtures/collection/test.json) and [a demo app](https://github.com/mikeapp/maptime-demo) are available.

![Screen capture](https://mikeapp.github.io/manifest-fixtures/images/maptimev0-1-0.png)

## Usage

### Application

Supply the URI of the Collection using the `collection` parameter.  For example:

https://mikeapp.github.io/maptime-demo/?collection=https://mikeapp.github.io/manifest-fixtures/collection/test.json

If no Manifest within the Collection contains the [`navPlace` property](https://iiif.io/api/extension/navplace/), the map will not be displayed.
Similarly, if no Manifest contains the [`navDate` property](https://iiif.io/api/presentation/3.0/#navdate), the date range slider will not be displayed. For example:

https://mikeapp.github.io/maptime-demo/?collection=https://iiif.library.utoronto.ca/presentation/v2/collections/anatomia:root
https://mikeapp.github.io/maptime-demo/?collection=https://www.e-codices.unifr.ch/metadata/iiif/collection/aev.json

### Component

The `CollectionMap` component requires two properties:
- A `collection` property that contains a `Collection` 
- A `viewerPath` that contains the path or URL of a IIIF viewer instance that will be displayed within an `<iframe>` in a full screen dialog. The manifest URI will be appended when a viewer is instantiated.

Note that the collection should be initialized before being passed to the component.  The `App.tsx` file in this project's Github repo demonstrates basic error handling and displays a progress indicator while the Collection's Manifests are downloaded.  
The `Collection`'s `fetch` method can be passed a callback function that will be updated with the percentage of manifests downloaded.
```javascript
const myCollection = new Collection("https://mikeapp.github.io/manifest-fixtures/collection/test.json");
await c.fetch();
```

Using the component, assuming UniversalViewer is available:
```javascript
<CollectionMap collection={myCollection}  viewerPath="./uv.html#?manifest=" />
```

### CSS

The component requires the following stylesheets:
```
    <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossorigin=""
    />
```

### Dependencies
The map is rendered using the react-leaflet library. In addition to React libraries, this component requires Material UI and Manifesto to be installed in your project.
