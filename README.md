# MapTime

A React component that displays a [IIIF Presentation API](https://iiif.io/api/presentation/3.0/) [Collection](https://iiif.io/api/presentation/3.0/#51-collection) with a map and timeline. This is currently a work in progress.

A [live demo](https://mikeapp.github.io/maptime-demo/?collection=https://mikeapp.github.io/manifest-fixtures/collection/test.json) is available.

![Screen capture](https://mikeapp.github.io/manifest-fixtures/images/maptimev0-1-0.png)

## Usage

### Application

Supply the URI of the Collection using the `collection` parameter.  For example:

https://mikeapp.github.io/maptime-demo/?collection=https://mikeapp.github.io/manifest-fixtures/collection/test.json

If no Manifest within the Collection contains the [`navPlace` property](https://iiif.io/api/extension/navplace/), the map will not be displayed. 
Similarly, if no Manifest contains the [`navDate` property](https://iiif.io/api/presentation/3.0/#navdate), the date range slider will not be displayed. For example:

https://mikeapp.github.io/maptime-demo/?collection=https://www.e-codices.unifr.ch/metadata/iiif/collection/aev.json


### Component

The `CollectionMap` component requires a `collection` property that contains the URI of the Collection to be loaded.

```javascript
<CollectionMap collection="https://mikeapp.github.io/manifest-fixtures/collection/test.json" />
```

The component expects the `uv.html` viewer page to be available in the same directory.