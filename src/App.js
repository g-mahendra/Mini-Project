import React from "react";
import Blog from "./Blog/Blog";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Mess from "./Mess";
import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import PrivateRoute from "./PrivateRoute";
import Header from "./Blog/Header";
import Grievance from "./Grievance";
import AcceptReviewsMess from "./AcceptReviewsMess";
import AcceptReviewsCanteen from "./AcceptReviewsCanteen";
import ReviewsMess from "./ReviewsMess";
import AddGrievance from "./AddGrievance";
import { useAuth } from "./context/AuthContext";
import Footer from "./Blog/Footer";
import Canteen from "./Canteen";
import UpdateForm from "./Components/UpdateForm";
import UpdateMenu from "./Components/UpdateMenu";
import ReviewsCanteen from "./ReviewsCanteen";

const App = () => {
  const { currentUser } = useAuth();
  return (
    <Router>
      <>
        {currentUser ? <Header title="Grievance System" /> : null}
        <Switch>
          <PrivateRoute exact path="/" component={Blog} />
          <Route exact path="/mess" component={Mess} />
          <Route exact path="/mess/addreview" component={AcceptReviewsMess} />
          <Route exact path="/mess/reviews" component={ReviewsMess} />
          <Route exact path="/mess/update" component={UpdateForm} />
          <Route exact path="/canteen" component={Canteen} />
          <Route
            exact
            path="/canteen/addreview"
            component={AcceptReviewsCanteen}
          />
          <Route exact path="/canteen/reviews" component={ReviewsCanteen} />
          <Route exact path="/canteen/update" component={UpdateMenu} />
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
