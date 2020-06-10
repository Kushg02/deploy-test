import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: "" };
    this.state = { title: "" };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:3000/notes",
      data: {
        title: this.state.title,
        content: this.state.content,
        author: "Kush",
      },
    }).then((res) => console.log(res.data)); //Console Logging For Axios
  };

  myChangeHandler1 = (event) => {
    this.setState({ content: event.target.value });
  };
  myChangeHandler2 = (event) => {
    this.setState({ title: event.target.value });
  };

  cancelCourse = () => {
    document.getElementById("titleContent").reset();
  };

  render() {
    return (
      <form id="titleContent" onSubmit={this.mySubmitHandler}>
        <h1>Hello {this.state.author}</h1>
        <p>Enter Your Note Content:</p>
        <p>Title:</p>
        <input type="text" onChange={this.myChangeHandler2} />
        <p>Content:</p>
        <input type="text" onChange={this.myChangeHandler1} />
        <br />
        <br />
        <input type="submit" onClick={this.cancelCourse} />
      </form>
    );
  }
}

ReactDOM.render(<MyForm />, document.getElementById("root"));
