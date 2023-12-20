import { Component } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Accueil from "./views/Accueil";
import { Erreur } from "./views/Erreur";
import CSV from "./views/CSV";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Accueil />}></Route>
          <Route path="/csv" element={<CSV />}></Route>
          <Route path="*" element={<Erreur />}></Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App;