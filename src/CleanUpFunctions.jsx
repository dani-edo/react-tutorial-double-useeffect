import { useEffect, useState } from "react";

function CleanUpFunctions() {
  // Clean up WebSocket connection
  useEffect(() => {
    const socket = new WebSocket("wss://example.com/socket");

    socket.onopen = () => console.log("WebSocket connection opened");
    socket.onmessage = (event) => console.log("Received:", event.data);

    return () => {
      console.log("Cleaning up WebSocket");
      socket.close();
    };
  }, []);

  // Clear interval
  const [count, setCount] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      console.log("Interval tick:", count);
    }, 1000);

    return () => {
      console.log("Cleaning up interval");
      clearInterval(intervalId);
    };
  }, [count]);

  // Remove event listener
  useEffect(() => {
    const handleResize = () => {
      console.log("Window resized");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      console.log("Cleaning up event listener");
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Abort an Ongoing Fetch Request
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("://api.examplhttpse.com/data", { signal })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
        }
      });

    return () => {
      console.log("Aborting fetch request");
      controller.abort();
    };
  }, []);

  // Clean Up Timeout
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Timeout executed");
    }, 5000);

    return () => {
      console.log("Clearing timeout");
      clearTimeout(timeoutId);
    };
  }, []);

  // Stop Observing Mutations or Intersections
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => console.log(entry.isIntersecting));
    });

    const target = document.querySelector("#observed-element");
    if (target) observer.observe(target);

    return () => {
      console.log("Disconnecting IntersectionObserver");
      observer.disconnect();
    };
  }, []);

  // Cancel Animations
  useEffect(() => {
    const element = document.getElementById("animated-element");

    const animation = element?.animate(
      [{ transform: "translateX(0px)" }, { transform: "translateX(100px)" }],
      { duration: 1000 }
    );

    return () => {
      console.log("Cancelling animation");
      animation?.cancel();
    };
  }, []);

  // WebRTC or Media Stream
  useEffect(() => {
    let mediaStream;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        mediaStream = stream;
        const videoElement = document.querySelector("video");
        if (videoElement) videoElement.srcObject = stream;
      })
      .catch((error) => console.error("Media error:", error));

    return () => {
      console.log("Stopping media tracks");
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Cleanup Library Subscriptions
  const someLibrary = {
    subscribe: () => {
      console.log("Subscribing to library");
      return { unsubscribe: () => console.log("Unsubscribing from library") };
    },
    unsubscribe: () => console.log("Unsubscribing from library"),
  };
  useEffect(() => {
    const subscription = someLibrary.subscribe((data) => {
      console.log(data);
    });

    return () => {
      console.log("Unsubscribing from library");
      subscription.unsubscribe();
    };
  }, []);

  // Cleaning Up State in External Stores
  const useDummyStore = () => ({
    subscribe: () => () => {},
    update: () => {},
  });
  const store = useDummyStore();
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      console.log("State changed");
    });

    return () => {
      console.log("Unsubscribing from store updates");
      unsubscribe();
    };
  }, []);

  // Stop Listening to IndexedDB or Other Databases
  useEffect(() => {
    const dbRequest = indexedDB.open("MyDatabase");

    dbRequest.onsuccess = () => {
      const db = dbRequest.result;
      db.onversionchange = () => console.log("Database version changed");

      return () => {
        console.log("Closing database connection");
        db.close();
      };
    };
  }, []);

  return <div>CleanUpFunctions</div>;
}

export default CleanUpFunctions;
