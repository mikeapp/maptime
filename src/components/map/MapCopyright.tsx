import {Box} from "@mui/material";
import React from "react";

const MapCopyright = () =>
    <Box display="block" p={2} sx={{clear:"left"}}>
        <p className="leafletMapCopyright">Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors</p>
    </Box>

export default MapCopyright;