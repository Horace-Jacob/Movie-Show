import React from "react";
import { PopularNow } from "./components/PopularNow";
import { Navbar } from "./components/Navbar";
import { ActionAdventure } from "./components/ActionAdventure";
import { ComedyRomance } from "./components/ComedyRomance";
import { Header } from "./components/Header/Header";

function App() {
  return (
    <div>
      <div>
        <Header />
        <PopularNow />
        <ActionAdventure />
        <ComedyRomance />
      </div>
    </div>
  );
}

export default App;
