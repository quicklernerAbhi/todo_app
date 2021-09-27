import React, { useEffect, useState } from "react";
import "../style/style.css";
// getting storage data back
const getLocalStorageData = () => {
  const listItems = localStorage.getItem("todoList");
  if (listItems) {
    return JSON.parse(listItems);
  } else {
    return [];
  }
};
const TodoApp = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalStorageData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  // adding at local storage
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(items));
  }, [items]);
  //   add item function
  const addItem = () => {
    if (!inputData) {
      alert("Please fill the data");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData([]);
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };
  // deletion item
  const deleteItem = (id) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== id;
    });
    setItems(updatedItems);
  };
  // All deletion
  const removeAll = () => {
    setItems([]);
  };
  // editing item
  const editItem = (index) => {
    const editingItem = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(editingItem.name);
    setIsEditItem(index);
    setToggleButton(true);
  };
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img
              src="https://raw.githubusercontent.com/thapatechnical/complete_react2021/76b2900dfaba3dc794d7f14f84c6fa4315a030bd/public/images/todo.svg"
              alt="todo"
            />
            <figcaption>Add Your List Here ✌ </figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              className="form-control"
              value={inputData}
              onChange={(e) => {
                setInputData(e.target.value);
              }}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* show our items */}
          <div className="showItems">
            {items.map((curElem, index) => {
              return (
                <div className="eachItem" key={index}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => {
                        editItem(curElem.id);
                      }}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => {
                        deleteItem(curElem.id);
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* remove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="REMOVE ALL"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default TodoApp;
