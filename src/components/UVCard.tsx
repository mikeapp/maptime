import {Card, CardMedia} from "@mui/material";
import {Manifest} from "../iiif/Manifest";

type UVCardProp = {
    manifest: Manifest | null;
}

const UVCard = ({manifest} : UVCardProp) => {
    return (
          <CardMedia
            component="iframe"
            sx={{height:"100vh"}}
            src={"./uv.html#?manifest=" + manifest?.uri}
          />
    );
}

export default UVCard;