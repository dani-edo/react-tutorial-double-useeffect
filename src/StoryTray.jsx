import { useState } from "react";

export default function StoryTray({ stories }) {
  const items = stories;
  items.push({ id: "create", label: "Create Story" });

  return (
    <ul
      style={{
        listStyle: "none",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      {items.map((story) => (
        <li
          key={story.id}
          style={{
            width: "33%",
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          {story.label}
        </li>
      ))}
    </ul>
  );
}
