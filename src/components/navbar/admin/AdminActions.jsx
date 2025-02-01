import React, { useState } from "react";
import {
    AdminAction,
    AdminFormGroup,
    Input,
    Select,
    ButtonGroup,
} from "../../../styles/navbar/adminStyles";
import { AdminActionButton } from "../../../styles/navbar/AdminButtons";

const AdminActions = ({ action, leagues = [], handleAction }) => {
    const [localParams, setLocalParams] = useState({});

    const handleChange = (param, value) => {
        setLocalParams((prev) => ({
            ...prev,
            [param]: value,
        }));
    };

    return (
        <AdminAction>
            <ButtonGroup>
                {action.params?.map((param) => (
                    <AdminFormGroup key={param}>
                        {param === "leagueId" ? (
                            <Select
                                value={localParams[param] || ""}
                                onChange={(e) => handleChange(param, e.target.value)}
                            >
                                <option value="">Select a league</option>
                                {leagues.map((league) => (
                                    <option key={league.id} value={league.id}>
                                        {league.leagueName}
                                    </option>
                                ))}
                            </Select>
                        ) : (
                            <Input
                                type="text"
                                placeholder={param}
                                value={localParams[param] || ""}
                                onChange={(e) => handleChange(param, e.target.value)}
                            />
                        )}
                    </AdminFormGroup>
                ))}
                <AdminActionButton
                    onClick={() => handleAction(action, localParams)}
                    variant="primary"
                >
                    {action.name}
                </AdminActionButton>
            </ButtonGroup>
        </AdminAction>
    );
};

export default AdminActions;
