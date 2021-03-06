
import React, { Component } from "react";
import DesignerListContainer from "containers/Designer/DesignerListContainer";

class DesignerListPage extends Component {
  render() {
    return(
        <DesignerListContainer sort={this.props.match.params.sorting? this.props.match.params.sorting : null}
                                cate1={this.props.match.params.cate1? this.props.match.params.cate1 : null}
                                cate2={this.props.match.params.cate2? this.props.match.params.cate2 : null}
                                history={this.props.history}/>
    );
  }
}

export default DesignerListPage;

// import React, { Component } from 'react'
// import Designer from "components/Designers/Designer";
// import { GetDesignerListRequest, GetDesignerListCountRequest } from "redux/modules/designer"
// import { GetCategoryAllRequest } from "redux/modules/category"

// import styled from 'styled-components'
// import Category from "components/Commons/Category"
// import OrderOption from "components/Commons/OrderOption"
// import ScrollList from "components/Commons/ScrollList"
// import Loading from "components/Commons/Loading"
// import { connect } from "react-redux";
// import osdstyle from 'opendesign_style';


// const TextWrapper = styled.div`
//     position: relative;
//     text-align: center;
//     line-height:37px;
//     font-size: 25px;
//     font-family: Noto Sans KR;
//     font-weight: 700;
//     color: red;
// `;
// const JoinDesignerButtonContainer = styled.div`
//     position: relative;
// `;
// const JoinDesigner = styled.div`
//     position: relative;
//     left: 1724px;
//     width:152px;
//     text-align: left;
//     font-size: 20px;
//     cursor: pointer;
//     font-family: Noto Sans KR;
//     font-weight:500;
//     color: red;
//     line-height: 29px;
//     border-bottom: 1.5px solid red;
// `;
// const DesignerListContainer = styled.div`
//     padding-top: 100px;
//     padding-bottom: 68px;
// `;

// class DesignerListPage extends Component {
//     state = {
//         page: 0,
//         search: null,
//         this_category: { text: null, value: null },
//         sub_category: { text: null, value: null },
//         main_category: { text: null, value: null },
//         this_order: { text: "등록순", keyword: "update" },
//         checkDataLength: 0,
//     }
//     componentDidMount() {
//         this.props.GetCategoryAllRequest()
//             .then(() => { this.props.GetDesignerListCountRequest() });
//         this.props.GetDesignerListRequest(null, null);
//     }
//     handleChangeCategory = async (category) => {
//         await this.setState({ page: 0, main_category: category, this_category: category, sub_category: { text: null, value: null } })
//         //console.log("category.value:", category.value)
//         this.props.GetDesignerListCountRequest(category.value || null)
//         this.reloadData()
//     }
//     handleChangeSubCategory = async (parent, category) => {
//         // console.log(this.props.category1[parent], parent)
//         await this.setState({ page: 0, main_category: this.props.category1[parent], this_category: this.props.category1[parent], sub_category: category })
//         this.props.GetDesignerListCountRequest(this.state.main_category.value, category.value)
//         this.reloadData()
//     }
//     handleChangeOrderOps = async (order) => {
//         await this.setState({ page: 0, this_order: order })
//         this.reloadData()
//     }
//     reloadData = () => {
//         this.props.GetDesignerListRequest(this.state.page, this.state.this_order.keyword, this.state.main_category.value || null, this.state.sub_category.value || null, this.state.search)
//     }
//     getList = async () => {
//         await this.setState({ page: this.state.page + 1 });
//         const { page, main_category, sub_category, keyword, order } = this.state;
//         return this.props.GetDesignerListRequest(page, order, main_category.value, sub_category.value, keyword);

//     };
//     changeCategory = (category) => {
//         this.handleChangeCategory(category)
//     }

//     render() {
//         const { this_category, main_category, sub_category, page, this_order } = this.state
//         const { category1, category2, Count, status } = this.props
//         console.log("DesignerListPage:", this.props.dataList, this.props.dataListAdded)
//         return (
//             <React.Fragment>
//                 <Category
//                     subcategory_clicked={this.handleChangeSubCategory} category_clicked={this.handleChangeCategory}
//                     category1={category1} category2={category2[this_category]} main_selected={main_category} sub_selected={sub_category} />

//                 <OrderOption order_clicked={this.handleChangeOrderOps} selected={this_order} />
//                 <TextWrapper onClick={() => this.changeCategory(this_category)}>{(this_category && this_category.text === "전체" ? "디자이너" : this_category.text) || "디자이너"}&nbsp;({Count})</TextWrapper>
//                 <JoinDesignerButtonContainer>
//                     <JoinDesigner onClick={() => this.handleClickJoin()}>디자이너 등록하기</JoinDesigner>
//                 </JoinDesignerButtonContainer>
//                 <DesignerListContainer>
//                     {status === "INIT"
//                         ? <Loading />
//                         : <ScrollList
//                             {...osdstyle.designer_margin} page={page} type="designer"
//                             getListRequest={this.getList} dataList={this.props.dataList} dataListAdded={this.props.dataListAdded} />}
//                 </DesignerListContainer>
//             </React.Fragment>
//         )

//     }
// }


// const mapStateToProps = (state) => {
//     // console.log("designerlist:", state)
//     return {
//         dataList: state.DesignerList.status.DesignerList,
//         dataListAdded: state.DesignerList.status.DesignerListAdded,
//         category1: state.Category.status.category1,
//         category2: state.Category.status.category2,
//         Count: state.DesignerList.status.Count,
//         status: state.DesignerList.status
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//         GetDesignerListRequest: (page, sort, cate1, cate2, keyword) => {
//             return dispatch(GetDesignerListRequest(page, sort, cate1, cate2, keyword))
//         },
//         GetDesignerListCountRequest: (cate1, cate2) => {
//             return dispatch(GetDesignerListCountRequest(cate1, cate2))
//         },
//         GetCategoryAllRequest: () => {
//             return dispatch(GetCategoryAllRequest())
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DesignerListPage)
