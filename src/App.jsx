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
                const item = { animal: animal, node };
                list.push(item);
                console.log(
                  `✅ Adding animal to the map. Total animals: ${list.length}`
                );
                if (list.length > 10) {
                  console.log("❌ Too many animals in the list!");
                }
              }}
            >
              <img src={animal.src} />
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
      src: "https://loremflickr.com/320/240/cat?lock=" + i,
    });
  }
  for (let i = 0; i < 10; i++) {
    animalList.push({
      type: "dog",
      src: "https://loremflickr.com/320/240/dog?lock=" + i,
    });
  }

  return animalList;
}
