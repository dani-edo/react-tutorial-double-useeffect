import { useRef, useState } from "react";

export default function AnimalFriends() {
  const itemsRef = useRef([]);
  const [animalList, setAnimalList] = useState(setupAnimalList);
  const [animal, setAnimal] = useState("cat");

  function scrollToAnimal(index) {
    const list = itemsRef.current;
    const { node } = list[index];
    node.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  const animals = animalList.filter((a) => a.type === animal);

  return (
    <>
      <nav>
        <button onClick={() => setAnimal("cat")}>Cats</button>
        <button onClick={() => setAnimal("dog")}>Dogs</button>
      </nav>
      <hr />
      <nav>
        <span>Scroll to:</span>
        {animals.map((animal, index) => (
          <button key={animal.src} onClick={() => scrollToAnimal(index)}>
            {index}
          </button>
        ))}
      </nav>
      <div>
        <ul>
          {animals.map((animal) => (
            <li
              key={animal.src}
              ref={(node) => {
                const list = itemsRef.current;
                list.push({ animal, node });
                console.log(
                  `✅ Adding animal to the map. Total animals: ${list.length}`
                );
                if (list.length > 10) {
                  console.log("❌ Too many animals in the list!");
                }
              }}
            >
              <img src={animal.src} style={{ width: "500px", height: "100%" }} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function setupAnimalList() {
  const animalList = [];
  for (let i = 0; i < 10; i++) {
    animalList.push({
      type: "cat",
      src: "https://plus.unsplash.com/premium_photo-1707353402061-c31b6ba8562e?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" + i,
    });
  }
  for (let i = 0; i < 10; i++) {
    animalList.push({
      type: "dog",
      src: "https://plus.unsplash.com/premium_photo-1668114375111-e90b5e975df6?q=80&w=3538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" + i,
    });
  }

  return animalList;
}
