import React from "react";
import { PopularNow } from "./components/PopularNow";
import { ActionAdventure } from "./components/ActionAdventure";
import { ComedyRomance } from "./components/ComedyRomance";
import { Header } from "./components/Header/Header";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div>
      <div>
        <Navbar />
        <Header />
        <PopularNow />
        <ActionAdventure />
        <ComedyRomance />
      </div>
    </div>
  );
}

export default App;
