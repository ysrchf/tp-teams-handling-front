// EditTeamForm.js
import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';

const EditTeamForm = ({ team, onCancel, onUpdateTeam }) => {
    const [editedTeam, setEditedTeam] = useState({ name: '', slogan: '' });
    const [errors, setErrors] = useState({});

    useEffect(() => {

        setEditedTeam({ name: team.name, slogan: team.slogan });
    }, [team]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTeam((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!editedTeam.name.trim()) {
            newErrors.name = 'mandatory';
        }
        if (!editedTeam.slogan.trim()) {
            newErrors.slogan = 'mandatory';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onUpdateTeam(editedTeam);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
                <Typography variant="h5">Modify team</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={editedTeam.name}
                        onChange={handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Slogan"
                        name="slogan"
                        value={editedTeam.slogan}
                        onChange={handleInputChange}
                        error={!!errors.slogan}
                        helperText={errors.slogan}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                        Modifier
                    </Button>
                    <Button onClick={onCancel} variant="outlined" color="secondary">
                        Annuler
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default EditTeamForm;
