// App.js
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {Button, Container, Typography, List, ListItem, Paper} from '@mui/material';
import TeamDetails from './TeamDetails';
import CreateTeamForm from './CreateTeamForm';
import EditTeamForm from "./EditTeamForm";

function App() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [isAddingTeam, setAddingTeam] = useState(false);
    const [isEditingTeam, setEditingTeam] = useState(false);
    const [teamId, setTeamId] = useState(0);

    const fetchData = () => {
        axios.get('http://localhost:8000/api/teams')
            .then(response => setTeams(response.data))
            .catch(error => console.error('Error fetching teams:', error))
    }

    useEffect(() => {
        fetchData()
    }, []);

    const handleTeamClick = useCallback( (team) => {
        setSelectedTeam(team)
        setTeamId(team.id)
        setAddingTeam(false);
    }, []);

    const handleEditTeam = (team) => {
        console.log('Clicked on Edit button');
        setTeamId(team.id)
        setSelectedTeam(team)
        setEditingTeam(true);
        setAddingTeam(false);
    };

    const handleCancelEdit = () => {
        setEditingTeam(false);
    };

    const handleAddTeam = async (newTeam) => {
        try {
            const response = await axios.post('http://localhost:8000/api/teams', newTeam);

            if (response.status === 201) {
                fetchData()
                setAddingTeam(false);
            } else {
                console.error('Error adding team:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding team:', error.message);
        }
    };

    const handleUpdateTeam = async (updatedTeam) => {
        try {

            console.log(teamId)
            const response = await axios.put(`http://localhost:8000/api/teams/${teamId}`, updatedTeam);

            if (response.status === 200) {
                setEditingTeam(false);
                setSelectedTeam(null);
            } else {
                console.error('Error update team:', response.statusText);
            }
        } catch (error) {
            console.error('Error update team:', error.message);
        } finally {
            fetchData()
        }

    };

    const handleDeleteTeam = async (teamId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/teams/${teamId}`);

            if (response.status === 204) {
                fetchData()
            } else {
                console.error('Error delete team:', response.statusText);
            }
        } catch (error) {
            console.error('Error delete team:', error.message);
        }
    };


    return (
        <Container maxWidth="md" style={{ marginTop: '20px' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Teams
            </Typography>
            {selectedTeam ? (
                isEditingTeam ? (
                    <EditTeamForm
                        team={selectedTeam}
                        onCancel={handleCancelEdit}
                        onUpdateTeam={handleUpdateTeam}
                    />
                ) : (
                    <TeamDetails team={selectedTeam} onBackButtonClick={() => setSelectedTeam(null)} />
                )
            ) : isAddingTeam ? (
                <CreateTeamForm onCancel={() => setAddingTeam(false)} onAddTeam={handleAddTeam} />
            ) : (
                <List>
                    {teams.map(team => (
                        <Paper key={team.id} elevation={3} style={{ margin: '10px', padding: '10px', cursor: 'pointer' }}>
                            <ListItem>
                                <Typography variant="h6">{team.name}</Typography>
                                <Typography variant="body2">{team.slogan}</Typography>
                                <Button onClick={() => handleTeamClick(team)} color="primary" style={{ marginLeft: '10px' }}>
                                    Voir
                                </Button>
                                <Button onClick={() => handleEditTeam(team)} color="primary" style={{ marginLeft: '10px' }}>
                                    Modify
                                </Button>
                                <Button onClick={() => handleDeleteTeam(team.id) && window.location.reload()}>
                                    Delete
                                </Button>
                            </ListItem>
                        </Paper>
                    ))}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setAddingTeam(true)}
                        style={{ marginTop: '20px' }}
                    >
                        Add a Team
                    </Button>
                </List>
            )}
        </Container>
    );
}

export default App;
