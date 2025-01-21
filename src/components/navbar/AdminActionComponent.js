import React, { useState } from "react";
import {
    AdminAction,
    AdminFormGroup,
    Input,
    Select,
    ButtonGroup,
    ActionButton,
    ActionItem,
} from "../../styles/navbar/adminStyles";

const AdminActionComponent = ({ action, leagues = [], handleAction }) => {
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
                <ActionItem>
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
                    <ActionButton onClick={() => handleAction(action, localParams)}>
                        {action.name}
                    </ActionButton>
                </ActionItem>
            </ButtonGroup>
        </AdminAction>
    );
};

export default AdminActionComponent;
