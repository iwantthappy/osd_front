import React, { Component } from "react";
import styled from "styled-components";
import CreateInfo from "../CreateInfo";
import CreateView from "../CreateView";
import { Container, Row } from "../Grid";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";

// css styling

const Wrapper = styled.div`
  background-color: #f9f9f9;
  width: 100%;
  min-width: 660px;
  padding: 20px 30px 30px;
  position: relative;
  & .ui.grid {
    margin: 0;
  }
`;

const Header = styled.h2`
  font-weight: 400;
  padding-left: 50px;
  color: #D7382C;
`;

const RouterContainer = Container.extend`
`;

const CheckTemp = styled.div`
  width: 80%;
  margin: 20px auto;
  & h3 {
    float: left;
  }
  & input {
    float: left;
    width: 20px;
    height: 20px;
    margin: 20px 0 0 10px;
  }
`;

const MainBtn = styled.button`
  padding: 7px 25px;
  border-radius: 30px;
  background-color: #EB3324;
  border: none;
  color: #fff;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 20px;
  &:hover {
    background-color: #CD4533;
  }
`;

class CreateDesign extends Component {
  state = {
    useProject: true,
    fileTrue: false
  };

  onProjectActive = (e) => {
    this.setState({
      useProject: !(this.state.useProject)
    });
  }

  goFileTrue = (e) => {
    this.setState({
      fileTrue: true 
    });
  }

  render(){
    return(
      <Wrapper>
        <Header>새 디자인 등록</Header>
        <RouterContainer>
          <CreateInfo/>
          <CheckTemp>
            <h3>과정 기록 사용</h3>
            <input type="checkbox" checked={this.state.useProject === true && "checked"} onChange={this.onProjectActive}/>
            <Row/>
          </CheckTemp>
          {this.state.useProject === false &&
            <CreateView fileTrue={this.goFileTrue}/>
          }
        </RouterContainer>
        <Row/>
        <Grid container={true} textAlign="center">
          {this.state.useProject === false? 
            this.state.fileTrue === true? <Link to="/designDetail/1"><MainBtn>등록</MainBtn></Link>
            : <Link to="/designDetail/2"><MainBtn>등록</MainBtn></Link>
          : <Link to="/designDetail/4"><MainBtn>등록</MainBtn></Link> }
        </Grid>
      </Wrapper>
    );
  }
}

export default CreateDesign;