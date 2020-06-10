import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }
  mySubmitHandler = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "http://192.168.1.15:3000/notes",
      data: {
        title: this.state.title,
        content: this.state.content,
        author: "Kush",
      },
    }).then((res) => {
      this.componentDidMount();
    });
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

  getNote() {
    axios.get("http://dummy.restapiexample.com/api/v1/notes").then((res) => {
      //const emps = res.data;
      //this.setState({ emps });
      console.log(res.data);
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const note = {
      title: this.state.title,
      content: this.state.content,
    };
    axios
      .post("http://dummy.restapiexample.com/api/v1/notes", note)
      .then((res) => console.log(res.data));
  }

  update(e, temp) {
    e.preventDefault();
    const note = {
      title: this.state.title,
      content: this.state.content,
    };
    axios
      .put(`http://192.168.1.15:3000/notes/${temp}`, note)
      .then((res) => console.log(res.data));
  }

  componentDidMount() {
    axios.get(`http://192.168.1.15:3000/notes`).then((res) => {
      const notes = res.data;
      this.setState({ notes });
    });
  }

  delete(e, temp) {
    e.preventDefault();
    axios.delete(`http://192.168.1.15:3000/notes/${temp}`).then((res) => {
      this.componentDidMount();
    });
  }

  render() {
    return [
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
      </Form>,

      this.state.notes.map((item, i) => [
        <li key={i}>{item.title}</li>,
        <ul>
          <li key={i}>
            {item.content}
            <Button
              type="submit"
              onClick={(e) => this.delete(e, item._id)}
              variant="danger"
            >
              DELETE
            </Button>
          </li>
        </ul>,
      ]),
    ];
  }
}

ReactDOM.render([<MyApp />], document.getElementById("root"));
