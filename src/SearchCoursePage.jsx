import React from "react";
import './searchcoursepage.css';
import {isEmpty,pickBy} from "lodash";
import { default as courseCatalog } from "./courses";

import { Button, Form, FormControl, FormGroup, FormLabel, Col, Row, Container, Table,  Dropdown,Image, DropdownButton} from 'react-bootstrap';

class SearchCoursePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level:[],
            setUrl:"",
            onSelectDropDownValue:[],
            filteredArray: courseCatalog,
            input: " "
        };
    this.userInput=this.userInput.bind(this);
    this.displayCourseTable=this.displayCourseTable.bind(this);
    this.filterLevel=this.filterLevel.bind(this);
    this.setFilteredArray=this.setFilteredArray.bind(this);
    this.onSelectDropdown=this.onSelectDropdown.bind(this);
    this.renderMainTable=this.renderMainTable.bind(this);
    this.renderDescriptionPage=this.renderDescriptionPage.bind(this);
    this.display=this.display.bind(this);
    this.dropDownFilteredArray=this.dropDownFilteredArray.bind(this);
    this.renderFullTable=this.renderFullTable.bind(this);
    }
    componentDidMount() {
        this.filterLevel();
    }
    userInput(event) {
        this.setState({input: event.target.value});
    }

    renderMainTable() {
        {isEmpty(this.state.onSelectDropDownValue) ? this.renderFullTable():this.dropDownFilteredArray()}
    }
    renderFullTable(){
        this.setState({filteredArray:courseCatalog});
    }
    dropDownFilteredArray(){

        this.setState({filteredArray:this.state.onSelectDropDownValue});
    }

    setFilteredArray() {

        const filteredCourse=courseCatalog.filter( (course)=> {

            return  course.courseId === parseInt(this.state.input);


        });

        this.setState({filteredArray:filteredCourse})
    }
    renderDescriptionPage(id) {
        window.location ="" +id;
    }
    display(){
        {isEmpty(this.state.input) ? this.renderMainTable() : this.setFilteredArray() }
    }



    displayCourseTable() {
        return (

            <section>

                {this.state.filteredArray.map( (course)=> {

                        return (
                            <article key={course.courseId} className="descArticle">
                                <img className="img" height="100px" width="100px" src={course.imgUrl}/>
                                <Col className="rowDetails">
                                    <Row><td width="350px">CourseId-{course.courseId}</td></Row>
                                    <Row><td width="350px">title-{course.title}</td></Row>
                                    <Row><td width="350px">language-{course.language}</td></Row>
                                    <Row><td width="350px">Level-{course.level}</td></Row>
                                    <Row><Button className="colorBtn" onClick={() => this.renderDescriptionPage(course.courseId)}>More Details</Button></Row>
                                </Col>


                            </article>

                        );
                }
                )}</section>

        );
    }

    filterLevel(){
        const filteredLevels=this.state.filteredArray.map(function (levels) {
           return levels.level;
        });
        const uniqueLevel = Array.from(new Set(filteredLevels));

        this.setState({level:uniqueLevel});
    }

    render() {


        return (
            <Container >
                    <Row className="rowStyle">
                        <Col>

                            <input  type="text" className="inputClass" placeholder="Enter courseId..." onChange={this.userInput}/>
                        </Col>
                        <Col>
                            <Button variant="success" size="md" onClick={this.display}>Submit</Button>
                        </Col>
                        <Col>
                              <DropdownButton variant="success" id="dropdown-item-button" title="Choose Level">
                                  <Dropdown.Item as="button" className="colorBtn" onSelect={this.renderFullTable}>None</Dropdown.Item>
                                {this.state.level.map(lev =>
                                    <Dropdown.Item as="button" className="colorBtn" key={lev}
                                                   onSelect={() => this.onSelectDropdown(lev)}>{lev}
                                    </Dropdown.Item>)
                                }
                              </DropdownButton>

                        </Col>


                    </Row>
                    {this.displayCourseTable()}
            </Container>

        );

    }
    onSelectDropdown(lev){
        const filterOnSelect=courseCatalog.filter(function (courseLevel) {
               return courseLevel.level === lev;
        });
        this.setState({filteredArray: filterOnSelect});
        this.setState({onSelectDropDownValue:filterOnSelect});
    }



}
export default SearchCoursePage;