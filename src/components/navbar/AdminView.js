import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLeagues } from "../../hooks/leagues/useLeagues";
import {
    AdminContainer,
    AdminTitle,
    AdminList,
    AdminSection,
    LimitInfo,
    StatusMessage,
    SectionTitle,
} from '../../styles/navbar/adminStyles';
import AdminActionComponent from "./AdminActionComponent";
import { adminActions } from "../../utils/adminUtils";

const AdminView = () => {
    const [statusMessage, setStatusMessage] = useState("");
    const [remainingLimit, setRemainingLimit] = useState(null);
    const { leagues } = useLeagues(true);

    const fetchLimit = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/req", {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
                withCredentials: true,
            });
            setRemainingLimit(response.data);
        } catch (error) {
            console.error("Error fetching limit:", error.response?.data || error.message);
            setRemainingLimit("Error fetching limit");
        }
    };

    const handleAction = async (action, params) => {
        let url = action.endpoint;
        action.params?.forEach((param) => {
            url = url.replace(`{${param}}`, params[param] || "");
        });

        try {
            setStatusMessage(`Executing: ${action.name}`);
            await axios({
                method: action.method,
                url,
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
                baseURL: "http://localhost:8080",
            });
            setStatusMessage(`Success: ${action.name}`);
            fetchLimit();
        } catch (error) {
            console.error(error);
            setStatusMessage(`Error: ${action.name} - ${error.message}`);
        }
    };

    useEffect(() => {
        fetchLimit();
    }, []);

    return (
        <AdminContainer>
            <AdminTitle>Admin Panel</AdminTitle>
            <LimitInfo>
                <strong>Remaining API Limit:</strong>{" "}
                {remainingLimit !== null ? remainingLimit : "Loading..."}
            </LimitInfo>
            <StatusMessage>{statusMessage}</StatusMessage>
            <AdminList>
                {Object.entries(adminActions).map(([section, actions]) => (
                    <AdminSection key={section}>
                        <SectionTitle>{section}</SectionTitle>
                        {actions.map((action) => (
                            <AdminActionComponent
                                key={action.name}
                                action={action}
                                leagues={leagues}
                                handleAction={handleAction}
                            />
                        ))}
                    </AdminSection>
                ))}
            </AdminList>

        </AdminContainer>
    );
};

export default AdminView;
