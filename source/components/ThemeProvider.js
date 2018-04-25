// @flow
import React, { Component } from "react";
import type { Node } from "react";
import { ThemeContext } from "../themes/ThemeContext";

// external libraries
import _ from "lodash";

// imports the Root Theme API object which specifies the shape
// of a complete theme for every component in this library, used in this.composeLibraryTheme
import ROOT_THEME_API from "../themes/API";

// internal utility functions
import { composeTheme } from "../utils";

type Props = {
  children: Node,
  theme: Object,
  themeOverrides: Object // custom css/scss from user that adheres to shape of ROOT_THEME_API
};

type State = {
  theme: Object,
  ROOT_THEME_API: Object
};

class ThemeProvider extends Component<Props, State> {
  static defaultProps = {
    themeOverrides: {}
  };

  constructor(props: Props) {
    super(props);

    const { theme, themeOverrides } = props;

    this.state = {
      theme: this.composeLibraryTheme(theme, themeOverrides, ROOT_THEME_API),
      ROOT_THEME_API
    };
  }

  // checks if theme and/or themeOverrides props have changed
  // in order to update state before rendering
  componentWillReceiveProps(nextProps: Props) {
    const { theme, themeOverrides } = nextProps;

    const changedProps = _.pickBy(
      { theme, themeOverrides },
      (value, key) => this.props[key] !== value
    );

    if (Object.keys(changedProps).length > 0) {
      this.setState({
        theme: this.composeLibraryTheme(theme, themeOverrides, ROOT_THEME_API)
      });
    }
  }

  // composeLibraryTheme returns a single obj containing theme definitions
  // for every component in the library.
  // Every key on the returned obj is named in conjunction with a component
  // in the library and each key's value is structured to contain the css
  // definitions for each element in that component. Which is just a string via CSS-Modules.

  // {
  //   button: { root: '', disabled: '' },
  //   input: { input: '', disabled: '', error: '' },
  //   formField: { root: '', label: '', error: '' },
  //   ... and so on, creating a complete theme for the library,
  //  }
  composeLibraryTheme = (
    theme: Object,
    themeOverrides: Object,
    ROOT_THEME_API: Object
  ) => {
    if (_.isEmpty(themeOverrides)) {
      return theme;
    } else {
      let composedTheme = { ...ROOT_THEME_API };

      for (const componentName in ROOT_THEME_API) {
        if (theme.hasOwnProperty(componentName)) {
          composedTheme[componentName] = theme[componentName];
        } else {
          // delete property from composedTheme obj because it will remain empty
          // only non-empty keys in this.props.theme should be returned
          delete composedTheme[componentName];
        }

        if (themeOverrides.hasOwnProperty(componentName)) {
          composedTheme[componentName] = composeTheme(
            theme[componentName],
            themeOverrides[componentName],
            ROOT_THEME_API[componentName]
          );
        }
      }

      return composedTheme;
    }
  };

  render() {
    return (
      <ThemeContext.Provider value={this.state}>
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

export default ThemeProvider;
