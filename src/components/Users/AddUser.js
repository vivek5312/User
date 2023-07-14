import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
import Wrapper from "../Helper/Wrapper";

const AddUser = (props) => {
  const nameInput = useRef();
  const ageInput = useRef();
  const collegeName = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const userName = nameInput.current.value;
    const userAge = ageInput.current.value;
    const College= collegeName.current.value;
    //const College = collegeName.current.value;
    if (
      userName.trim().length === 0 ||
      userAge.trim().length === 0||
      College.trim().length===0
    ) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+userAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(userName, College ,userAge, );
    nameInput.current.value = "";
    ageInput.current.value = "";
    collegeName.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInput} />

          <label htmlFor="age">Age(Years)</label>
          <input id="age" type="number" ref={ageInput} />
          <label htmlFor="college">College</label>
          <input id="college" type="text" ref={collegeName} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
