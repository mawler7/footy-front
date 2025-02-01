import React from 'react';
import { Header, EditIcon } from '../../styles/league/LeaguesStyles';
import { FaEdit } from 'react-icons/fa';

const LeagueHeader = ({ isDragEnabled, onToggleEdit }) => (
    <Header>
        <EditIcon onClick={onToggleEdit} title="Edit leagues order">
            <FaEdit color={isDragEnabled ? 'yellow' : 'white'} />
        </EditIcon>
        My leagues
    </Header>
);

export default LeagueHeader;
