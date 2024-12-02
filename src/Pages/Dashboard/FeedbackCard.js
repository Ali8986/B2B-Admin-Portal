import React from "react";
import Iconify from "../../Components/GeneralComponents/Iconify";

const FeedbackCard = ({ title, count, icon }) => {
  return (
    <div className="feedback_card rounded-3">
      <div className="row px-2 py-3">
        <div className="col-8 text-center">
          <h6>{count}</h6>
          <p className="mb-0 h6 text-black text_headding">{title}</p>
        </div>
        <div className="col-4">
          <div className="icon-section" style={{ backgroundColor: "#006599" }}>
            <Iconify
              icon={icon}
              width={25}
              height={25}
              sx={{ color: "white" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
