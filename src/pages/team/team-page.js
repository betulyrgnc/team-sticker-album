/** Dependencies */
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams, Link} from "react-router-dom";

/** Components */
import Button from "../../components/button/button";

/** Partials */
import TeamList from "../../partials/team-list/team-list";
import TeamInfo from "../../partials/team-info/team-info";

/** Slices */
import {
    getTeamWithPrevAndNextAsync,
    getCurrentTeamMembers,
    selectCurrentTeam,
    selectPreviousTeam,
    selectNextTeam,
    selectCurrentTeamMembers,
} from "../../store/team/teamSlice";

/** Stylesheets */
import "./team-page.scss";

export default function TeamPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const [slicedTeamMembers, setSlicedTeamMembers] = useState();

    const currentTeam = useSelector(selectCurrentTeam)
    const previousTeam = useSelector(selectPreviousTeam)
    const nextTeam = useSelector(selectNextTeam)
    const currentTeamMembers = useSelector(selectCurrentTeamMembers)

    useEffect(() => {
        dispatch(getTeamWithPrevAndNextAsync(+params.id))

        dispatch(getCurrentTeamMembers(+params.id));

    }, [params.id]);

    useEffect(() => {
        if (!currentTeamMembers?.length) {
            return;
        }

       setTimeout(() => {
           setSlicedTeamMembers({
               firstMembers: currentTeamMembers.slice(0, 2),
               secondMembers: currentTeamMembers.slice(2, 5),
               thirdMembers: currentTeamMembers.slice(5),
           })
       },[50])
    }, [currentTeamMembers]);

    if (!currentTeam || !slicedTeamMembers) return null;

    return (
        <div className="team-page">
            <div className="team-page__button">
                {/* @todo create urlUtils and manage it that file */}
                {previousTeam ?
                    <Link to={`/${previousTeam.id}/${previousTeam.slug}`} className="prev-page-button"
                          style={{textDecoration: 'none'}}>
                        <Button content={"Prev Page"}/>
                    </Link> :
                    <Link to={`/`} style={{textDecoration: 'none'}}>
                        <Button content={"Home Page"}/>
                    </Link>
                }
            </div>
            <div className={"team-page__album cl-s-2"}>
                <div className="team-page__album-info">
                    <TeamInfo dataInfo={currentTeam}/>
                </div>
                <div className="team-page__album">
                    <TeamList className="first" teamMembers={slicedTeamMembers.firstMembers}/>
                    <TeamList className="second" teamMembers={slicedTeamMembers.secondMembers}/>
                </div>
            </div>
            <div className={"team-page__album cl-s-7"}>
                <div className="team-page__album-items">
                    <TeamList className="third" teamMembers={slicedTeamMembers.thirdMembers}/>
                </div>
            </div>
            <div className="team-page__button">
                {/* @todo create urlUtils and manage it that file */}
                {nextTeam &&
                <Link to={`/${nextTeam.id}/${nextTeam.slug}`} style={{textDecoration: 'none'}}>
                    <Button content={"Next Page"}/>
                </Link>}
            </div>
        </div>
    );
}

