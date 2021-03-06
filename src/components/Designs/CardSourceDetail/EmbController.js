import React, { Component } from 'react';
import styled from 'styled-components';
import opendesign_style from 'opendesign_style';

const EmbEditWrap = styled.div`
  width: 100%;
  border: 1px solid ${opendesign_style.color.grayScale.scale1};
  & #embValContainer {
    min-height: 100px;
    max-height: 300px;
    line-height: 1.4;
    padding: .5rem;
    overflow-y: scroll;
  }
`;

const EmbMenu = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: ${opendesign_style.font.size.heading4};
  color: ${opendesign_style.color.grayScale.scale9}
  background-color: ${opendesign_style.color.grayScale.scale1};
  padding: 0 .5rem;
`;

class EmbController extends Component {
  state = {
    value: this.props.value,
  };

  componentDidMount() {
    if (!this.props.value) {
      document.getElementById("embValContainer").innerText = "소스를 붙여넣기 해주세요";
    } else {
      document.getElementById("embValContainer").innerText = this.props.value;
    }
  }

  onSave = async () => {
    const newValue = document.getElementById('embValContainer').innerHTML;
    await this.setState({
      value: newValue,
    });
    //this.props.getValue(this.state.value);
  };

  setInit = () => {
    if (!this.props.value && !this.state.value) {
      document.getElementById("embValContainer").innerText = "";
    }
  }

  render() {
    return (
      <EmbEditWrap>
        <EmbMenu>EMBED</EmbMenu>
        <div contentEditable="true" id="embValContainer" onBlur={this.onSave} onFocus={this.setInit} />
      </EmbEditWrap>
    );
  }
}

export default EmbController;
