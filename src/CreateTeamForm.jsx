// CreateTeamForm.js
import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';

const CreateTeamForm = ({ onCancel, onAddTeam }) => {
    const [teamData, setTeamData] = useState({ name: '', slogan: '' });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeamData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!teamData.name.trim()) {
            newErrors.name = 'mandatory';
        }
        if (!teamData.slogan.trim()) {
            newErrors.slogan = 'mandatory';
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onAddTeam(teamData);
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
                <Typography variant="h5">Create a new team</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={teamData.name}
                        onChange={handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Slogan"
                        name="slogan"
                        value={teamData.slogan}
                        onChange={handleInputChange}
                        error={!!errors.slogan}
                        helperText={errors.slogan}
                        fullWidth
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
                        Add
                    </Button>
                    <Button onClick={onCancel} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default CreateTeamForm;
