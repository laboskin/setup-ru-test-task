import React from "react";
import './App.css';
import {StorageContextProvider} from "./Storage/Storage";
import Header from "./Header/Header";
import UserList from "./UserList/UserList";
import {ModalContextProvider} from "./Modal/Modal";
import FloatingAddButton from "./FloatingAddButon/FloatingAddButton";

function App() {

  return (
      <StorageContextProvider>
          <ModalContextProvider>
              <Header />
              <UserList />
              <FloatingAddButton />
          </ModalContextProvider>
      </StorageContextProvider>
  );
}

export default App;
