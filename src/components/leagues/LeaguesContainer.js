import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FaEdit } from 'react-icons/fa';

const LeaguesContainer = ({ setLeagueOrder = () => { } }) => {
  const [leagues, setLeagues] = useState([]);
  const [favoriteLeagues, setFavoriteLeagues] = useState([]);
  const [isDragEnabled, setIsDragEnabled] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      fetchLeagues();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!setLeagueOrder || typeof setLeagueOrder !== 'function') {
      console.warn('setLeagueOrder is not defined or not a function');
    }
  }, [setLeagueOrder]);

  const fetchLeagues = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get("http://localhost:8080/leagues/current", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const fetchedLeagues = Array.isArray(response.data) ? response.data : [];
      const savedOrder = JSON.parse(localStorage.getItem('leagueOrder'));
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteLeagues')) || [];

      if (savedOrder) {
        const reorderedLeagues = savedOrder
          .map(id => fetchedLeagues.find(league => league.id === id))
          .filter(Boolean);
        setLeagues(reorderedLeagues);
      } else {
        setLeagues(fetchedLeagues);
      }

      setFavoriteLeagues(storedFavorites);
      setLeagueOrder(fetchedLeagues.map(league => league.id));
    } catch (error) {
      console.error("Error fetching leagues:", error);
    }
  };

  const handleLeagueClick = (leagueId) => {
    navigate(`/league/${leagueId}`);
  };

  const toggleFavorite = (leagueId) => {
    const updatedFavorites = favoriteLeagues.includes(leagueId)
      ? favoriteLeagues.filter(id => id !== leagueId)
      : [...favoriteLeagues, leagueId];

    setFavoriteLeagues(updatedFavorites);
    localStorage.setItem('favoriteLeagues', JSON.stringify(updatedFavorites));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedLeagues = Array.from(leagues);
    const [movedLeague] = updatedLeagues.splice(result.source.index, 1);
    updatedLeagues.splice(result.destination.index, 0, movedLeague);

    setLeagues(updatedLeagues);
    setLeagueOrder(updatedLeagues.map(league => league.id));
    localStorage.setItem('leagueOrder', JSON.stringify(updatedLeagues.map(league => league.id)));
  };

  // Toggle drag-and-drop mode
  const toggleDragMode = () => {
    setIsDragEnabled(!isDragEnabled);
  };

  return (
    <Sidebar>
      <PinnedLabel>
        Favorite Leagues
        <EditIcon onClick={toggleDragMode} title="Edit leagues order">
          <FaEdit color={isDragEnabled ? "yellow" : "white"} />
        </EditIcon>
      </PinnedLabel>
      {isDragEnabled ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="leagues">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {leagues.map((league, index) => (
                  <Draggable key={league.id} draggableId={String(league.id)} index={index}>
                    {(provided, snapshot) => (
                      <LeagueItem

                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.5 : 1,
                        }}
                      >
                        <FlagLogo
                          src={league.type === 'League' ? league.flag : league.logo} alt={league.name} />
                        <LeagueName>{league.leagueName}</LeagueName>
                      </LeagueItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div>
          {leagues.map((league) => (
            <LeagueItem key={league.id}
              onClick={() => handleLeagueClick(league.id)}>
              <FlagLogo src={league.type === 'League' ? league.flag : league.logo} alt={league.name} />
              <LeagueName>{league.leagueName}</LeagueName>
            </LeagueItem>
          ))}
        </div>
      )}
    </Sidebar>
  );
};

export default LeaguesContainer;

// Styled components
const EditIcon = styled.span`
  cursor: pointer;
  margin-left: 8px;
  font-size: 14px;

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    color: #ffffff;
    box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(85, 94, 97, 0.4)' : '0 3px 6px rgba(68, 76, 78, 0.5)')};
      cursor: pointer;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }

  @media (max-width: 767px) {
    justify-content: center; /* Wyśrodkuj logo na mniejszych ekranach */
    padding: 5px 0; /* Dopasuj padding */
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

const FlagLogo = styled.img`
  height: 20px;
  width: 20px;
  object-fit: contain;
  @media (max-width: 767px) {
    margin-right: 0; 
  }
`;



const LeagueName = styled.span`
  color: white;
  flex-grow: 1;
  display: block;
  margin-left: 10px;

  @media (max-width: 875px) {
    display: none;
  }
`;

const PinnedLabel = styled.div`
  font-size: 14px;
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  margin-left: 5px;
  
  @media (max-width: 875px) {
    display: none;
  }
`;

const Sidebar = styled.div`

  margin-top: 10px;
  margin-left: 5px;
  transition: width 0.3s ease;
  max-width: 195px;

  @media (max-width: 767px) {
    justify-content: center; /* Wyśrodkuj logo na mniejszych ekranach */
    padding: 5px 0; /* Dopasuj padding */
    margin-bottom: 10px;
    font-size: 14px;
      width: 30px;
  }

  @media (max-width: 875px) {
    width: 36px;
 
  }
`;







const LeagueItem = styled.div`
  
  width: 180px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
  padding: 5px;
  background-color: rgba(28, 30, 36, 0.7);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  font-size: 11px;

  &:hover {
    background: ${({ $isActive }) => ($isActive ? 'rgb(85, 94, 97)' : 'rgb(58, 63, 65)')};
    color: #ffffff;
    box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 8px rgba(85, 94, 97, 0.4)' : '0 3px 6px rgba(68, 76, 78, 0.5)')};
      cursor: pointer;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(85, 94, 97, 0.6);
  }

  &:active {
    transform: scale(0.97);
  }

  @media (max-width: 875px) {
    justify-content: center; /* Wyśrodkuj logo na mniejszych ekranach */
    padding: 5px 0; /* Dopasuj padding */
    margin-bottom: 10px;
    font-size: 14px;
      width: 30px;
  }
`;

