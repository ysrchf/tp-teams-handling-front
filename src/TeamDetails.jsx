// TeamDetails.js
import React from 'react';
import { Typography, Button, Paper, Grid } from '@mui/material';

const TeamDetails = ({ team, onBackButtonClick }) => {

    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px', maxWidth: '400px' }}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item>
                    <Typography variant="h4">Team Details</Typography>
                </Grid>
                {team ? (
                    <>
                        <Grid item>
                            <Typography variant="body1">Name: {team.name}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body1">Slogan: {team.slogan}</Typography>
                        </Grid>
                    </>
                ) : (
                    <Grid item>
                        <Typography variant="body1">Loading...</Typography>
                    </Grid>
                )}
                <Grid item>
                    <Button variant="contained" color="primary" onClick={onBackButtonClick}>
                        Back to Teams
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TeamDetails;
