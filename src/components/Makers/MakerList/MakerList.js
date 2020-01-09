import React, { Component } from "react";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";
import Sorting from "components/Commons/Sorting";
import ScrollMakerListContainer from "containers/Maker/ScrollMakerListContainer";
import ContentBox from "components/Commons/ContentBox";
import CategoryContainer from "containers/Commons/CategoryContainer/CategoryContainer";
import StyleGuide from "StyleGuide";
import NumberFormat from "modules/NumberFormat";

// css styling
const Wrapper = styled.div`
  width: 100%;
`;
const Content = styled(ContentBox)`
  @media only screen and (max-width: 991px) and (min-width: 768px){
    & .ui.grid>.row{
      margin-left: 6.25% !important;
    }
  }
  background-color: ${props => props.bgcolor || "#FFF"};
`;
const MenuContainer = styled(Grid)`
  & .sorting {
    text-align: right;
    line-height: 50px;
  }
  & .ui.default.dropdown:not(.button)>.text,
  & .ui.dropdown:not(.button)>.default.text {
    color: inherit;
  }
  &.ui.grid > .row {
    padding-top: 0rem;
    padding-bottom: 0rem;
  }
`;

const MenuWrap = styled.div`
  background-color: white;
  border-top: 1px solid rgba(0,0,0,0.2);
  box-shadow: 0 1px 1px 1px ${StyleGuide.color.geyScale.scale3};
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 3;
`;

const Head = styled.div`
  padding-top: 80px;
  padding-bottom: 2rem;
  font-size: ${StyleGuide.font.size.paragraph};

  & .Sorting{
    float: right;
  }

`;


class MakerList extends Component {
    constructor(props) {
        super(props);
        this.state = { rendering: true }
    }
    componentDidMount() {
        this.props.GetDesignerTotalCountRequest(this.props.cate1, this.props.cate2);
    }
    changeState = async () => {
        await this.setState({
            rendering: false
        });
        await this.setState({
            rendering: true
        });
    }
    cate1Change = (value) => {
        this.props.history.replace(`/maker/${this.props.sort}/${value}/null`);
        this.props.GetDesignerTotalCountRequest(value, null);
        this.changeState();
    }

    cate2Change = (cate1, value) => {
        if (cate1 && this.props.cate1 !== cate1) {
            this.props.history.replace(`/maker/${this.props.sort}/${cate1}/${value}`);
        } else {
            this.props.history.replace(`/maker/${this.props.sort}/${this.props.cate1}/${value}`);
        }
        this.props.GetDesignerTotalCountRequest(this.props.cate1, value);
        this.changeState();
    }

    sortChange = (e, { value }) => {
        this.props.history.replace(`/maker/${value}/${this.props.cate1}/${this.props.cate2}`);
        this.changeState();
    }

    render() {
        const { sort, cate1, cate2, Count } = this.props;
        const Header = () => {
            const cate1List = this.props.category1;
            const cate2List = this.props.category2;

            if (!(cate1List && cate1List.length !== 0 && cate2List && cate2List.length !== 0)) {
                return <div>nothing</div>;
            }

            const cate1Name = cate1 && cate1 !== "null" ? cate1List[cate1] : null;
            const cate2Name = cate2 && cate2 !== "null" ? cate2List[parseInt(cate1, 10)].filter(sub => sub.value === parseInt(cate2, 10)) : null;

            return (
                <Head>
                    <span>메이커 </span>
                    {cate1 && cate1 !== "null" && <span> > {cate1Name.text} </span>}
                    {cate2 && cate2 !== "null" && <span> > {cate2Name.length !== 0 && cate2Name[0].text}</span>}
                    <span> ({NumberFormat(Count)})</span>
                    <div className="Sorting">
                        <Sorting handleClick={this.sortChange} placeholder={sort} />
                    </div>
                </Head>
            );
        };

        return (<React.Fragment>
            <MenuWrap>
                <Content>
                    <Wrapper>
                        <MenuContainer devided="vertically" padded={true} columns={2}>
                            <Grid.Row stretched={false}>
                                <CategoryContainer
                                    which="메이커" board="maker"
                                    cate1={this.props.cate1}
                                    handleCate1={this.cate1Change}
                                    cate2={this.props.cate2}
                                    handleCate2={this.cate2Change} />
                            </Grid.Row>
                        </MenuContainer>
                    </Wrapper>
                </Content>
            </MenuWrap>
            <Content bgcolor="#EFEFEF">
                <Header />
                <Wrapper className="listWrap">
                    {this.state.rendering &&
                        <ScrollMakerListContainer
                            sort={sort} cate1={cate1} cate2={cate2}
                            history={this.props.history} />}
                </Wrapper>
            </Content>
        </React.Fragment>);
    }
}

export default MakerList;