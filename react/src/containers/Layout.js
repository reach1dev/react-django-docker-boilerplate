import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Theme from "../Theme";

class CustomLayout extends Component {
  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        { this.props.children}
      </MuiThemeProvider>
    );
  }
}

export default CustomLayout;