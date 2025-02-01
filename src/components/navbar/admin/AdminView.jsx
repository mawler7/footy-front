import React from "react";
import { useLeagues } from "../../../hooks/leagues/useLeagues";
import {
    AdminContainer,
    AdminTitle,
    AdminList,
    AdminSection,
    LimitInfo,
    StatusMessage,
    SectionTitle,
} from "../../../styles/navbar/adminStyles";
import AdminActions from "./AdminActions";
import { adminActions } from "../../../utils/adminUtils";
import { useApiLimit } from "../../../hooks/common/useApiLimit";
import { useAdminActionHandler } from "../../../hooks/admin/useAdminActionHandler";

const AdminView = () => {
    const { leagues } = useLeagues(true);
    const { limit, loading, error, refetch } = useApiLimit();
    const { executeAction, statusMessage } = useAdminActionHandler(refetch);

    return (
        <AdminContainer>
            <AdminTitle>Admin Panel</AdminTitle>
            <LimitInfo>
                <strong>Remaining API Limit:</strong>{" "}
                {loading ? "Loading..." : error ? error : limit}
            </LimitInfo>
            <StatusMessage>{statusMessage}</StatusMessage>
            <AdminList>
                {Object.entries(adminActions).map(([section, actions]) => (
                    <AdminSection key={section}>
                        <SectionTitle>{section}</SectionTitle>
                        {actions.map((action) => (
                            <AdminActions
                                key={action.name}
                                action={action}
                                leagues={leagues}
                                handleAction={executeAction}
                            />
                        ))}
                    </AdminSection>
                ))}
            </AdminList>
        </AdminContainer>
    );
};

export default AdminView;