# MapTime

A React component that displays a IIIF Presentation API collection with a map and timeline. 

This is currently a proof of concept and a work in progress.

## Usage

The `CollectionMap` component requires a `collection` property that contains the URI of the IIIF Collection to be loaded.

```javascript
<CollectionMap collection="https://mikeapp.github.io/manifest-fixtures/collection/test.json" />
```