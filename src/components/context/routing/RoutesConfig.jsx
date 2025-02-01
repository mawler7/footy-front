import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingSpinner from "../../common/LoadingSpinner";

const LoginPage = lazy(() => import("../../login/LoginPage"));
const AdminView = lazy(() => import("../../navbar/admin/AdminView"));
const DBView = lazy(() => import("../../navbar/db/DBView"));
const Matches = lazy(() => import("../../matches/Matches"));
const Match = lazy(() => import("../../match/Match"));
const League = lazy(() => import("../../league/League"));
const Player = lazy(() => import("../../players/Player"));
const Team = lazy(() => import("../../team/Team"));

const routes = [
    { path: "/login", component: LoginPage },
    { path: "/admin", component: AdminView },
    { path: "/", component: Matches },
    { path: "/fixture/id/:id", component: Match },
    { path: "/league/:leagueId", component: League },
    { path: "/player/:playerId", component: Player },
    { path: "/team/:id", component: Team },
    { path: "/db", component: DBView },
];

const RoutesConfig = () => (
    <Suspense fallback={<LoadingSpinner />}>
        <Routes>
            {routes.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
        </Routes>
    </Suspense>
);

export default RoutesConfig;
