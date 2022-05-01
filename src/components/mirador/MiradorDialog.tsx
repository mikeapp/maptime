import {AppBar, Dialog, IconButton, Toolbar} from "@mui/material";
import {Manifest} from "../../iiif/Manifest";
import CloseIcon from '@mui/icons-material/Close';

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
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {manifest?.uri}

        </Dialog>
    );
}

export default MiradorDialog;