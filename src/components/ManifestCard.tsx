import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import {Manifest} from "../iiif/Manifest";
import MapIcon from '@mui/icons-material/Map';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

type ManifestCardProps = {
    manifest: Manifest;
    isSelected?: boolean;
    onSelect?: (manifest: Manifest) => void;
}

const ManifestCard = ({manifest, onSelect, isSelected}: ManifestCardProps) =>
    <Card raised={true}>
        <CardActionArea
            onClick={() => onSelect? onSelect(manifest) : null}
        >
            <CardMedia
                component="img"
                image={manifest?.thumb(200)}
                alt={manifest.label()}
                height={150}
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
                mb={2}
                >{manifest.label()}</Typography>
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
            <Box sx={{clear:"left"}}>
                { (manifest.navPlace()) ? <MapIcon color={isSelected? "primary" : "inherit"} /> : <MapIcon color="disabled" sx={{opacity: '50%'}} /> }
            </Box>
        </CardContent>
    </Card>;

export default ManifestCard;