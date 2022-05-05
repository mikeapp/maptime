# MapTime

A React component that displays a IIIF Presentation API collection with a map and timeline. This is currently a proof of concept and a work in progress.

A [live demo](https://mikeapp.github.io/maptime-demo/?collection=https://mikeapp.github.io/manifest-fixtures/collection/test.json) is available.

![Screen capture](https://mikeapp.github.io/manifest-fixtures/images/maptimev0-1-0.png)

## Usage

### Application

Supply the URI of the collection using the `collection` parameter.  For example:

https://mikeapp.github.io/maptime-demo/?collection=https://mikeapp.github.io/manifest-fixtures/collection/test.json

If no manifest within the collection contains the `navPlace` property, the map will not be displayed. 
Similarly if no manifest contains the `navDate` property, the date range slider will not be displayed. For example:

https://mikeapp.github.io/maptime-demo/?collection=https://www.e-codices.unifr.ch/metadata/iiif/collection/aev.json


### Component

The `CollectionMap` component requires a `collection` property that contains the URI of the IIIF Collection to be loaded.

```javascript
<CollectionMap collection="https://mikeapp.github.io/manifest-fixtures/collection/test.json" />
```

The component expects the `uv.html` viewer page to be available in the same directory.