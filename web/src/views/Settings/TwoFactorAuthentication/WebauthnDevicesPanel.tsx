import React, { Fragment, useState } from "react";

import { Button, Paper, Tooltip, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useTranslation } from "react-i18next";

import { WebauthnDevice } from "@models/Webauthn";
import WebauthnDeviceRegisterDialog from "@views/Settings/TwoFactorAuthentication/WebauthnDeviceRegisterDialog";
import WebauthnDevicesStack from "@views/Settings/TwoFactorAuthentication/WebauthnDevicesStack";

interface Props {
    devices: WebauthnDevice[] | undefined;
    handleRefreshState: () => void;
}

export default function WebauthnDevicesPanel(props: Props) {
    const { t: translate } = useTranslation("settings");

    const [showRegisterDialog, setShowRegisterDialog] = useState<boolean>(false);

    return (
        <Fragment>
            <WebauthnDeviceRegisterDialog
                open={showRegisterDialog}
                setCancelled={() => {
                    setShowRegisterDialog(false);
                    props.handleRefreshState();
                }}
            />
            <Paper variant={"outlined"}>
                <Grid container spacing={2} padding={2}>
                    <Grid xs={12} lg={8}>
                        <Typography variant="h5">{translate("Webauthn Credentials")}</Typography>
                    </Grid>
                    <Grid xs={4} lg={2}>
                        <Tooltip title={translate("Click to add a Webauthn credential to your account")}>
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                    setShowRegisterDialog(true);
                                }}
                            >
                                {translate("Add")}
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid xs={12}>
                        {props.devices === undefined || props.devices.length === 0 ? (
                            <Typography variant={"subtitle2"}>
                                {translate(
                                    "No Webauthn Credentials have been registered. If you'd like to register one click add.",
                                )}
                            </Typography>
                        ) : (
                            <WebauthnDevicesStack
                                devices={props.devices}
                                handleRefreshState={props.handleRefreshState}
                            />
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </Fragment>
    );
}
