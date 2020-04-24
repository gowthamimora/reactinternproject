import React  from "react";
import {Jumbotron,Container,Row} from 'react-bootstrap';
import { default as courseCatalog } from "./courses";
import './DescriptionPage.css';
import {BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch} from "react-router-dom";
export default function ParamsExample() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/:id" children={<Child />} />
                </Switch>
            </div>
        </Router>
    );
}
function Child() {
    let {id} = useParams();
    console.log(id)
    const filterOnDescription=courseCatalog.filter(function (course ) {
        return course.courseId===parseInt(id);

    });

    const displayCourseDescription=filterOnDescription.map(function (desc) {
        return(
            <Container className="rowColor">
                <Jumbotron>
                <h1>Course Description!</h1>
                <p>
                    {desc.shortDescription}
                </p>
                </Jumbotron>
            </Container>


        )

    });
    return displayCourseDescription;
}






