import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component.jsx";
import SearchPage from "./pages/search-page/search-page.component.jsx";
import Header from "./components/header/header.component";
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectInputHidden } from "./redux/search/search.selectors";
import { checkUserSession } from "./redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import FavoritesPage from "./pages/favorites/favorites.component";
import Confirmation from "./pages/confirmation/confirmation.component";
import Portal from "./components/portal/portal.component";
import ModalManager from "./components/modals/modal-manager";
import Footer from "./components/footer/footer.component";
import { selectCartHidden } from "./redux/cart/cart.selectors";
import { selectDropdownHidden } from "./redux/shop/shop.selectors";

const App = ({
  checkUserSession,
  currentUser,
  inputHidden,
  cartHidden,
  shopDropdownHidden,
}) => {
  // equivalent to componentDidMount (will only re-render if checkUserSession changes, and we know it will not)
  useEffect(() => {
    // check if user's authentication has persisted
    checkUserSession();
  }, [checkUserSession]);

  const showOverlay = () => {
    if (!inputHidden) {
      return "input-visible";
    } else if (!cartHidden || !shopDropdownHidden) {
      return "cart-visible";
    }
  };

  return (
    <div id="app" className={showOverlay()}>
      <Header />
      <div className="content-window">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/favorites" component={FavoritesPage} />
          <Route
            exact
            path="/confirmation"
            render={(data) =>
              !data.location.paymentData ? (
                <Redirect to="/" />
              ) : (
                <Confirmation />
              )
            }
          />
          {/* If user signed in, redirect user to home page when clicking signin.
            also redirects to home when user signs in.
          render prop determines what component to return*/}
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
            }
          />
          <Route path="/search" component={SearchPage} />
        </Switch>
      </div>
      <Footer />
      <Portal>
        <ModalManager />
      </Portal>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  inputHidden: selectInputHidden,
  cartHidden: selectCartHidden,
  shopDropdownHidden: selectDropdownHidden,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
