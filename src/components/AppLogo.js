import React from "react";

import { Box, Typography } from "@material-ui/core";

export default function ({ title = '' }) {

  return (
    <span>
      { title === '' && <Typography component='h4' variant='h4' display='inline'> mySpeedCam </Typography>}
      { title !== '' && <Typography component='h6' variant='h6' display='inline'> {title} </Typography>}
    </span>
  )
}