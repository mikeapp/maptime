import {Card, CardMedia} from "@mui/material";
import {Manifest} from "../iiif/Manifest";

type UVCardProp = {
    manifest: Manifest | null;
    viewerPath: string;
}

const UVCard = ({manifest, viewerPath} : UVCardProp) => {
    return (
          <CardMedia
            component="iframe"
            sx={{height:"100vh"}}
            src={viewerPath + manifest?.uri}
          />
    );
}

export default UVCard;