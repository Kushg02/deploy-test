import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:3000/notes",
      data: {
        title: "ReactTest",
        content: "ifYouSeeThisItworksInReact! YAY",
      },
    }).then((res) => console.log(res.data));

    alert("You are submitting " + this.state.username);
  };
  myChangeHandler = (event) => {
    this.setState({ username: event.target.value });
  };
  render() {
    return (
      <form onSubmit={this.mySubmitHandler}>
        <h1>Hello {this.state.username}</h1>
        <p>Enter your name, and submit:</p>
        <input type="text" onChange={this.myChangeHandler} />
        <input type="submit" />
      </form>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById("root"));
