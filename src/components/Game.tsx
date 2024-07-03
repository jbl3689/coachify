import React from "react";
import SoccerLineUp from "react-soccer-lineup";

const home = {
  name: "POR",
  module: "4-4-2",
  team: [
    [
      {
        number: 1,
        name: "Patricio",
      },
    ],
    [
      {
        number: 21,
        name: "Soares",
      },
      {
        number: 3,
        name: "Pepe",
      },
      {
        number: 6,
        name: "Fonte",
      },
      {
        number: 5,
        name: "Guerriero",
      },
    ],
    [
      {
        number: 14,
        name: "Calvalho",
      },
      {
        number: 8,
        name: "Mountinho",
      },
      {
        number: 11,
        name: "Silva",
      },
      {
        number: 17,
        name: "Guedes",
      },
    ],
    [
      {
        number: 16,
        name: "Fernandes",
      },
      {
        number: 7,
        name: "Cristiano Ronaldo",
      },
    ],
  ],
  home_team_events: [
    {
      id: 203,
      type_of_event: "red-card",
      player: "Silva",
      time: "3'",
    },
    {
      id: 210,
      type_of_event: "yellow-card",
      player: "Fernandes",
      time: "64'",
    },
    {
      id: 210,
      type_of_event: "yellow-card",
      player: "Fonte",
      time: "64'",
    },
    {
      id: 206,
      type_of_event: "substitution-in",
      player: "Fonte",
      time: "31'",
    },
  ],
};

const away = {
  name: "SPA",
  module: "4-2-3-1",
  team: [
    [
      {
        number: 1,
        name: "De Gea",
      },
    ],
    [
      {
        number: 18,
        name: "Alba",
      },
      {
        number: 15,
        name: "Ramos",
      },
      {
        number: 3,
        name: "Pique",
      },
      {
        number: 4,
        name: "Nacho",
      },
    ],
    [
      {
        number: 8,
        name: "Koke",
      },
      {
        number: 5,
        name: "Busquets",
      },
    ],
    [
      {
        number: 6,
        name: "Iniesta",
      },
      {
        number: 22,
        name: "Isco",
      },
      {
        number: 21,
        name: "Silva",
      },
    ],
    [
      {
        number: 19,
        name: "Costa",
      },
    ],
  ],
  away_team_events: [
    {
      id: 210,
      type_of_event: "yellow-card",
      player: "De Gea",
      time: "12'",
    },
    {
      id: 206,
      type_of_event: "substitution-in",
      player: "Iniesta",
      time: "31'",
    },
    {
      id: 206,
      type_of_event: "substitution-in",
      player: "Costa",
      time: "32'",
    },
    {
      id: 206,
      type_of_event: "red-card",
      player: "Silva",
      time: "31'",
    },
  ],
};

function Game() {
  return (
    <div>
      {/* <FootballField home={home} away={away} /> */}
      {/* <SoccerLineUp size={"small"} color={"lightseagreen"} pattern={"lines"} /> */}
    </div>
  );
}

export default Game;
