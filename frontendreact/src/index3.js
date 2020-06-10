import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
      url: "http://10.7.42.126:3000/notes",
      data: {
        title: this.state.title,
        content: this.state.content,
        author: "Kush",
      },
    }).then((res) => console.log(res.data)); //Console Logging For Axios

    alert("Succesfully Submitted :)");
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
      <Form id="titleContent" onSubmit={this.mySubmitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Note Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            onChange={this.myChangeHandler2}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Note Content</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Content"
            onChange={this.myChangeHandler1}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.cancelCourse}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default class NotesList extends React.Component {
  state = {
    notes: [],
  };

  componentDidMount() {
    axios.get(`http://10.7.42.126:3000/notes`).then((res) => {
      const notes = res.data;
      this.setState({ notes });
    });
  }

  render() {
    return (
      <ul>
        {this.state.notes.map((note) => [
          <form onSubmit={this.myDeleteHandler}>
            <li>{note.title}</li>
            <ul>
              <li>{note.content}</li>
            </ul>
          </form>,
        ])}
      </ul>
    );
  }
}

ReactDOM.render([<MyForm />, <NotesList />], document.getElementById("root"));
