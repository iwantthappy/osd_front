import React, { Component } from "react";
import styled from "styled-components";

const MsgSectionBoard = styled.div`
  width:100%;
  // height: ${props => props.height}px;
  height:100%;
  position: relative;
  flex-direction: column-reverse;
  justify-content: flex-end;
  overflow: hidden;
  :hover {
    overflow-y: overlay;
    overflow-x: hidden;
  }
`;
const ReceiveMessageBox = styled.div`
  width: 100%;
  margin-bottom: 32px;
  position: relative;
  display:flex;
  justify-content: flex-start;
  align-items:flex-end;
  .messageReceiveBubble{
    display: inline-block;
    width: 45%;
    padding: 13px 25px 13px 20px;
    border-radius: 20px;
    background-color: #FFFFFF;
    word-wrap:break-word;
  }
  .messageText {
    width: 100%;
    font-size: 17px;
    font-weight: 500;
    font-family: Noto Sans KR;
    color: #707070;
    text-align: left;
    line-height: 25px;
  }
  .messageReceiveTime {
    width: 100px;
    height: 25px;
    text-align: left;
    font-family: Noto Sans KR;
    font-weight: 300;
    margin-left:10px;
  }
`;
const SendMessageBox = styled.div`
    width: 100%;
    margin-bottom: 32px;
    position: relative;
    display:flex;
    justify-content:flex-end;
    align-items:flex-end;
    .messageSendBubble{
      display: inline-block;
      width: 45%;
      padding: 13px 25px 13px 20px;
      border-radius: 20px;
      background-color: #FFFFFF;
      word-wrap:break-word;
    }
    .messageText {
      width: 100%;
      font-size: 17px;
      font-weight: 500;
      font-family: Noto Sans KR;
      color: #707070;
      text-align: left;
      line-height: 25px;
    }
    .messageSendTime {
      width: 100px;
      height: 25px;
      text-align: right;
      font-family: Noto Sans KR;
      font-weight: 300;
      margin-right:10px;
    }
`;

function CheckedTime(date) {
  let updateT = new Date(date);
  let today = new Date();
  //today = today.getTime() + 32400000;
  const diff = today - updateT;
  const m = 30;
  //const diffMin = parseInt((diff / 1000) / 3600 * 60, 10); // N분 전
  const diffHour = parseInt((diff / 1000) / 3600, 10); // N시간 전
  const diffDay = parseInt(diffHour / 24, 10); // N일 전
  const diffMon = parseInt(diffDay / m, 10);

  let updateMin = updateT.getMinutes();
  let updateHour = updateT.getHours();

  const ampm = updateHour < 12 ? "오전 " : "오후 ";
  updateHour = updateHour % 12;
  const updateMinT = updateMin < 10 ? "0" + updateMin.toString() : updateMin.toString();
  const updateHourT = updateHour < 10 ? "0" + updateHour.toString() : updateHour.toString();

  const dateTime = ampm + updateHourT + ":" + updateMinT;

  if (diffHour < 1) {
    return `${dateTime}`;
  } else if (1 <= diffHour && diffDay < 1) { // 하루 전까지
    return `${diffHour}시간 전`;
  } else if (1 <= diffDay && diffDay < m) { // 한달 전까지
    return `${diffDay}일 전`;
  } else if (11 >= diffMon && m <= diffDay) { // 한달 이후부터
    return `${diffMon}달 전`;
  } else if (12 <= diffMon) {
    let year = diffMon / 12.0;
    if (year - year.toFixed(0) === 0)
      return `${year}년 전`;
    else
      return `${year.toFixed(1)}년 전`;
  }
}


function MsgReceiveBox(props) {
  return (
    <ReceiveMessageBox>
      <div className="messageReceiveBubble">
        <div className="messageText">{props.msgText}</div>
      </div>
      <div className="messageReceiveTime">{props.updateTime}</div>
    </ReceiveMessageBox>
  );
}
function MsgSendBox(props) {
  return (
    <SendMessageBox>
      <div className="messageSendTime">{props.updateTime}</div>

      <div className="messageSendBubble">
        <div className="messageText">{props.msgText}</div>
      </div>
    </SendMessageBox>
  );
}


function LoadMessage(props) {
  if (props.isMyMsg === true) {
    return (<MsgSendBox msgText={props.msgText} updateTime={props.updateTime} />);
  }
  else {
    return (<MsgReceiveBox msgText={props.msgText} updateTime={props.updateTime} />);
  }
}
class MessageDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { render: true };
    this.ScrollDown = this.ScrollDown.bind(this);
  }
  componentDidMount() {
    console.log("messagID", this.props.id);
    this.props.GetMyMsgDetailRequest(this.props.token, this.props.id);
  }
  componentWillUnmount() {
    this.props.GetMyMessageDetailClear();
  }
  ScrollDown() {
    document.getElementById("MsgBox").scrollTo(0, document.getElementById("MsgBox").scrollHeight);
  }
  shouldComponentUpdate(nextProps) {
    setTimeout(() => {
      this.ScrollDown();
    }, 100);
    return true;
  }

  render() {
    const list = this.props.MessageDetail;
    const myId = this.props.userInfo.uid;
    const arrMsg = list.map(item => {
      let isMyMsg = true;
      if (item.from_user_id !== myId) isMyMsg = false;
      return (
        <React.Fragment key={item.uid}>
          <LoadMessage isMyMsg={isMyMsg} msgText={item.message === "" ? "\u00a0" : item.message} updateTime={CheckedTime(item.create_time)} />
        </React.Fragment>
      );
    })

    return (
      <React.Fragment>
        <MsgSectionBoard height={this.props.height} id="MsgBox" onClick={this.ScrollDown}>
          {arrMsg}
        </MsgSectionBoard>
      </React.Fragment>
    );
  }
}

export default MessageDetail;
