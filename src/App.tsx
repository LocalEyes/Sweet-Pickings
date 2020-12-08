import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  // useParams,
  // Link,
} from "react-router-dom";

import DefaultLayout from "./layouts/Default";
import HomePage from "./pages/home";
import ChallengesPage from "./pages/challenges";
import SolutionsPage from "./pages/solutions";
import CaseStudies from "./pages/case-studies";
import { Helmet, HelmetProvider } from "react-helmet-async";
import About from "./pages/about";
import Suggestion from "./pages/suggestion";
import Solution from "./pages/solution";
import CaseStudy from "./pages/case-study";
import Header from "./components/Header/Header";

import { api } from "./api";
import Footer from "./components/Footer/Footer";

const App = () => {
  // Set the initial content with what have from the link via link state.
  const [groupData, setGroupData] = useState<any>();

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
    <HelmetProvider>
      <Helmet>
        <title>LocalEyes</title>
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        ></meta>
        {/* <link rel="manifest" href="./shelley.webmanifest"></link> */}
        <link
          rel="stylesheet"
          href="https://use.typekit.net/bml4mzu.css"
        ></link>
      </Helmet>
      <DefaultLayout>
        <Router>
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
              <ChallengesPage group={groupData}/>
            </Route>
            <Route exact path="/solutions">
              <SolutionsPage group={groupData}/>
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
      </DefaultLayout>
    </HelmetProvider>
  );
};

export default App;
