import React from "react";

import Grid from "@mui/material/Unstable_Grid2";

import { WebauthnDevice } from "@models/Webauthn";
import WebauthnDeviceItem from "@views/Settings/TwoFactorAuthentication/WebauthnDeviceItem";

interface Props {
    devices: WebauthnDevice[];
    handleRefreshState: () => void;
}

export default function WebauthnDevicesStack(props: Props) {
    return (
        <Grid container spacing={3}>
            {props.devices.map((x, idx) => (
                <WebauthnDeviceItem key={idx} index={idx} device={x} handleEdit={props.handleRefreshState} />
            ))}
        </Grid>
    );
}
