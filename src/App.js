
import './App.css';
import Header from './Mycomponent/Header';
import { Todos } from './Mycomponent/Todos';
import { Footer } from './Mycomponent/Footer';
import { AddTodo } from './Mycomponent/AddTodo';
// import todo from './Mycomponent/todo';

import { About } from './Mycomponent/About';
import React, { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  let initTodo;
  if (localStorage.getItem("todos") == null) {
    initTodo = []

  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete = (todo) => {
    console.log("I am on Delete", todo)
    setTodos(todos.filter((e) => {
      return e !== todo;
      localStorage.setItem("todos", JSON.stringify(todos));
    }))
  }

  const addTodo = (title, desc) => {
    console.log("I am adding todo", title, desc)
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;

    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }



  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));

  }, [todos])

  return (

    <>
      <Router>
        <Header title="MyTodosList" />

        <Switch>
          <Route exact path="/" render={() => {
            return (
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>)
          }}>

          </Route>

          <Route exact path="/about">
            <About />
          </Route>


        </Switch>



        <Footer />
      </Router >
    </>
  );
}

export default App;
