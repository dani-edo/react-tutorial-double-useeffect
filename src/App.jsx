import { useState } from "react";
import StoryTray from "./StoryTray";

let initialStories = [
  { id: 0, label: "Ankit's Story" },
  { id: 1, label: "Taylor's Story" },
];

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        textAlign: "center",
      }}
    >
      <StoryTray stories={initialStories} />
    </div>
  );
}

export default App;
