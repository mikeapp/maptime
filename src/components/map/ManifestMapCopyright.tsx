import {Box, Typography} from "@mui/material";
import React from "react";

const ManifestMapCopyright = () =>
    <Box display="block" p={2} sx={{clear:"left"}}>
        <Typography variant="caption">Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors</Typography>
    </Box>

export default ManifestMapCopyright;