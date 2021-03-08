import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  // useParams,
  // Link,
} from "react-router-dom";

import HomePage from "./pages/home";
import ChallengesPage from "./pages/challenges";
import SolutionsPage from "./pages/solutions";
import CaseStudies from "./pages/case-studies";
import About from "./pages/about";
import Suggestion from "./pages/suggestion";
import Solution from "./pages/solution";
import CaseStudy from "./pages/case-study";
import Header from "./components/Header/Header";
import HeaderTwo from "./components/Header/HeaderTwo";

import { api } from "./api";
import Footer from "./components/Footer/Footer";

import SearchResults from "./pages/search-results";

const App = () => {
  // Set the initial content with what have from the link via link state.
  const [groupData, setGroupData] = useState<any>();
  // const params: any = useParams();
  useEffect(() => {
    // GET solution via id from the url params.
    api
      .get(`/groups/10479`)
      .then(async (response) => {
        // console.log("response", response.data.data[0]);
        // Update solutions content with what comes back from the API
        setGroupData(response.data.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
        <Router>
          <HeaderTwo />
          <Header />
          {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/challenges">
              <ChallengesPage />
            </Route>
            <Route exact path="/solutions">
              <SolutionsPage />
            </Route>
            <Route exact path="/case-studies">
              <CaseStudies />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/suggestion">
              <Suggestion />
            </Route>
            <Route exact path="/suggestion/:type">
              <Suggestion />
            </Route>
            <Route exact path="/solutions/:topicId">
              <SolutionsPage />
            </Route>
            <Route exact path="/search_results/:searchText">
              <SearchResults />
            </Route>
          </Switch>
          <Route
            path="/solutions/:solutionId/:solutionSlug"
            component={Solution}
          />
          <Route
            path="/case-studies/:caseStudyId/:caseStudySlug"
            component={CaseStudy}
          />
          <Footer />
        </Router>
  );
};

export default App;
