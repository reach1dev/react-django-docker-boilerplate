import React from 'react';
import { Box, Grid, Typography } from "@material-ui/core";
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';


export default function ({ title, titleVariant, numberOfVehicles, avgSpeed, maxSpeed }) {
  const displayInline = window.screen.width < 500 ? 'block' : 'inline';
  // const displayInline = 'inline';

  return (
    <Box pt={{ xs: 2, lg: 3 }} pb={2} pl={{ xs: 2, lg: 4 }} pr={{ xs: 1, lg: 2 }} boxShadow={3} width='100%'>
      <Grid container justify='space-between'>
        <Grid item xs={4} style={{ alignSelf: 'center' }}>
          <Typography variant={titleVariant || 'h5'} component='h6'> {title} </Typography>
        </Grid>

        <Grid container item xs={3} justify='flex-start'>
          <Typography variant='h6' component='h6'> Avg. Speed </Typography>
        </Grid>

        <Grid container item xs={3} justify='flex-start'>
          <Box textAlign='left'>
            <Typography variant='h6' component='h6'> Max. Speed </Typography>
          </Box>
        </Grid>
      </Grid >

      <Box mb={2} />

      <Grid container justify='space-between' alignItems='center'>
        <Grid item xs={4}>
          <Typography variant='h5' component='h5' display={displayInline}> {numberOfVehicles} </Typography>
          <Typography variant='caption' component='span' display={displayInline}>vehicles</Typography>
        </Grid>

        <Grid item xs={3}>
          <Typography variant='h5' component='h5' display={displayInline}> {avgSpeed} </Typography>
          <Typography variant='caption' component='span' display={displayInline}>MPH</Typography>
        </Grid>

        <Grid item xs={3}>
          <Box textAlign='left'>
            <Typography variant='h5' component='h5' display={displayInline}> {maxSpeed} </Typography>
            <Typography variant='caption' component='span' display={displayInline}>MPH</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box >
  )
}