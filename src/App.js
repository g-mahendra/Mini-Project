import React, { useEffect, useState } from "react";
import Blog from "./Blog/Blog";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Mess from "./Mess";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import PrivateRoute from "./PrivateRoute";
import Header from "./Blog/Header";
import Grievance from "./Grievance";
import AcceptReviews from "./AcceptReviews";
import Review from "./Reviews";
import AddGrievance from "./AddGrievance";
import { useAuth } from "./context/AuthContext";
import Footer from "./Blog/Footer";
import Canteen from "./Canteen";
import UpdateForm from "./Components/UpdateForm";

const App = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      <>
        {currentUser ? <Header title="Grievance System" /> : null}
        <Switch>
          <PrivateRoute exact path="/" component={Blog} />
          <Route exact path="/mess" component={Mess} />
          <Route exact path="/mess/addreview" component={AcceptReviews} />
          <Route exact path="/mess/reviews" component={Review} />
          <Route exact path="/mess/update" component={UpdateForm} />
          <Route exact path="/canteen" component={Canteen} />
          <Route exact path="/grievance" component={Grievance} />
          <Route
            exact
            path="/grievance/addgrievance"
            component={AddGrievance}
          />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
        {currentUser ? (
          <Footer
            title=""
            description="This Application is a Student Project meant for Education Purposes only"
          />
        ) : null}
      </>
    </Router>
  );
};

export default App;
