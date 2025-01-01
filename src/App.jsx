import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "Initial Data",
    };
    console.log("Constructor: Component is being initialized.");
  }

  UNSAFE_componentWillMount() {
    console.log("UNSAFE_componentWillMount: Component is about to mount.");
    // perform initialize state
    // code with side effect
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log("UNSAFE_componentWillReceiveProps: New props received.");
    console.log("Next Props:", nextProps);
    // data fetching code or side effects
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log("UNSAFE_componentWillUpdate: Component is about to update.");
    console.log("Next Props:", nextProps);
    console.log("Next State:", nextState);
    // data fetching code or side effects
  }

  componentDidMount() {
    console.log("componentDidMount: Component mounted successfully.");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate: Component updated successfully.");
    console.log("Previous Props:", prevProps);
    console.log("Previous State:", prevState);
  }

  updateData = () => {
    this.setState({ data: "Updated Data" });
  };

  render() {
    console.log("Render: Component is rendering.");
    return (
      <div>
        <h1>React App</h1>
        <p>Data: {this.state.data}</p>
        <button onClick={this.updateData}>Update Data</button>
      </div>
    );
  }
}

export default App;
