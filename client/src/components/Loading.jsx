import React from "react";

const Loading = () => {
  return (
    <div
      className="ui segment"
      // style={{ border: "2px solid black", width: "50vw", height: "100vh" }}
    >
      <div className="ui active inverted dimmer">
        <div className="ui small text loader">Loading</div>
      </div>
    </div>
  );
};

export default Loading;
