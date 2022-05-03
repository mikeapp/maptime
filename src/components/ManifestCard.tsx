import {Box, Button, Card, CardActionArea, CardContent, CardMedia, IconButton, Typography} from "@mui/material";
import React from "react";
import {Manifest} from "../iiif/Manifest";
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

type ManifestCardProps = {
    manifest: Manifest;
    isSelected?: boolean;
    onSelect?: (manifest: Manifest) => void;
    onShowInViewer?: (manifest: Manifest) => void;
}

const ManifestCard = ({manifest, onSelect, isSelected, onShowInViewer}: ManifestCardProps) =>
    <Card raised={true}>
        <CardActionArea
            onClick={() => onSelect? onSelect(manifest) : null}>
            <CardMedia
                component="img"
                image={manifest?.thumb(200)}
                alt={manifest.label()}
                height={160}
                key={manifest.uri}
            />
        </CardActionArea>
        <CardContent>
            <Typography
                variant="caption"
                component="h2"
                display="-webkit-box"
                overflow="hidden"
                height={60}
                sx={{"WebkitLineClamp":3}}
                >{manifest.label()}</Typography>


            <Box sx={{clear:"both"}}>
            { (manifest.navDateYear()) ?
                <div>
                 <CalendarMonthIcon sx={{float:"left"}} />
                 <Typography variant="caption" display="inline" gutterBottom>{manifest.navDateYear()}</Typography>
                </div>
                :
                <div>
                    <CalendarMonthIcon color="disabled" sx={{float:"left", opacity: '50%'}} />
                </div>
            }
            </Box>
            <Box sx={{clear:"left"}}>
                { (manifest.navPlace()) ? <MapIcon color={isSelected? "primary" : "inherit"} /> : <MapIcon color="disabled" sx={{opacity: '50%'}} /> }
                <IconButton sx={{float:"right"}} size="small" onClick={() => onShowInViewer? onShowInViewer(manifest) : null}><ZoomInIcon /></IconButton>
            </Box>
        </CardContent>
    </Card>;

export default ManifestCard;