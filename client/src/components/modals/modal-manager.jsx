import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectModal } from "../../redux/modal/modal.selectors";
import SignInToAddFav from "./sign-in-to-add-fav.component";

const ModalLookupTable = {
  SignInToAddFav,
};

const ModalManager = ({ modal }) => {
  const { currentModal, modalProps } = modal;
  // currentModal (string name of modal) will be global state object
  // if not null, return the modal that was passed in
  if (currentModal) {
    const ModalComponent = ModalLookupTable[currentModal];
    console.log("ModalManager: open modal", ModalComponent);

    return <ModalComponent {...modalProps} />;
  }
  // else don't render anything
  return null;
};

// mapstatetoprops -> currentModal
const mapStateToProps = createStructuredSelector({
  modal: selectModal,
});

export default connect(mapStateToProps)(ModalManager);