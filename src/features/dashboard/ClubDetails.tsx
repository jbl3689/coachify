import React from "react";

function ClubDetails() {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-2xl text-amber-300">Ellerslie AFC Diamonds</div>
      <div className="flex gap-4">
        <img
          src="/logo.png"
          alt="team logo"
          height="300"
          width="150"
          className="rounded-xl"
        ></img>
        <div className="flex flex-col text-xl justify-evenly text-secondaryLightColor">
          <span>Michaels Ave</span>
          <span>NRF Division 1</span>
          <span>Football ⚽️</span>
        </div>
      </div>
    </div>
  );
}

export default ClubDetails;
