import {AppBar, Box, Container, Dialog, IconButton, Toolbar, Typography} from "@mui/material";
import {Manifest} from "../../iiif/Manifest";
import CloseIcon from '@mui/icons-material/Close';
import Mirador from "./Mirador";
import React from "react";
import "./MiradorDialog.css"

type MiradorDialogProps = {
    manifest: Manifest | null;
    handleClose: () => void;
}

const MiradorDialog = ({manifest, handleClose}: MiradorDialogProps) => {
    return(
        <Dialog
            fullScreen
            open={manifest !== null}
            onClose={handleClose}
        >
                <AppBar position="sticky">
                    <Toolbar sx={{backgroundColor:"dimgray"}}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon fontSize={"small"} />
                        </IconButton>
                        <Typography variant="h5" component="h1" p={2}>Item View</Typography>
                    </Toolbar>
                </AppBar>
                <Mirador manifestUri={manifest?.uri} />
        </Dialog>
    );
}

export default MiradorDialog;