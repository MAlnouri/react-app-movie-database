import "./App.css";
import Header from "./components/Header/Header";
import Search from "./Pages/Search/Search";
import { Container } from "@material-ui/core";

function App() {
  return (
    <>
      <Header />
      <div className="app">
        <Container className="app_flex">
            <Search />
        </Container>
      </div>
    </>
  );
};

export default App;