/** Dependencies */
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

/** Pages */
const Team = lazy(() => import("./pages/team/team-page"));
const Home = lazy(() => import("./pages/home/home-page"));

export default function AppRoutes() {
    return (
        <Suspense fallback={<div className="loading">Loading...</div>}>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/:id/:teamName" element={<Team />} />
            </Routes>
        </Suspense>
    );
}
