import React, { useReducer } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Navbar from "./Navbar.js";
import SideDrawer from "./SideDrawer.js";
import Backdrop from "./Backdrop.js";
import Searchbar from "./Searchbar.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import "./App.css";

const GlobalStyle = createGlobalStyle`
  body, .side-drawer, footer, input, select, a:visited {
    background-color: ${props => (props.theme.mode ? "#222" : "#FFF")};
    color: ${props => (props.theme.mode ? "#FFF" : "rgb(68, 68, 68)")}
    }
  .google-logo {
    background-image: ${props =>
      props.theme.mode
        ? "url(https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_light_color_74x24dp.png)"
        : "url(https://www.gstatic.com/images/branding/googlelogo/1x/googlelogo_dark_color_74x24dp.png)"};
    opacity: ${props => (props.theme.mode ? "1" : "0.6")}
  }
`;

function App() {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      isSideDrawerOpen: false,
      searchFonts: "",
      typeSomething: "",
      fontSize: "20px",
      isDarkTheme: false,
      isList: false
    }
  );

  const sideDrawerToggle = () => {
    setUserInput({ isSideDrawerOpen: !userInput.isSideDrawerOpen });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setUserInput({ [name]: value });
  };

  const toggleTheme = () => {
    setUserInput({ isDarkTheme: !userInput.isDarkTheme });
  };

  const listGridToggle = () => {
    setUserInput({ isList: !userInput.isList });
  };

  const reset = () => {
    setUserInput({ searchFonts: "" });
    setUserInput({ typeSomething: "" });
    setUserInput({ fontSize: "20px" });
    setUserInput({ isDarkTheme: false });
    setUserInput({ isList: false });
  };

  return (
    <ThemeProvider theme={{ mode: userInput.isDarkTheme }}>
      <>
        <GlobalStyle />
        <div>
          <Navbar sideDrawerToggle={sideDrawerToggle} />
          <SideDrawer isSideDrawerOpen={userInput.isSideDrawerOpen} />
          {userInput.isSideDrawerOpen ? (
            <div>
              <Backdrop sideDrawerToggle={sideDrawerToggle} />
            </div>
          ) : null}

          <Searchbar
            searchFonts={userInput.searchFonts}
            typeSomething={userInput.typeSomething}
            fontSize={userInput.fontSize}
            handleChange={handleChange}
            toggleTheme={toggleTheme}
            listGridToggle={listGridToggle}
            isList={userInput.isList}
            reset={reset}
          />

          <Main
            searchFonts={userInput.searchFonts}
            typeSomething={userInput.typeSomething}
            fontSize={userInput.fontSize}
            isList={userInput.isList}
          />

          <div
            className="to-top"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <div className="fa fa-long-arrow-up"></div>
          </div>
          <Footer />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
