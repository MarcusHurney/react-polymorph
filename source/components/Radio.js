// @flow
import React, { Component } from "react";
import { bool, func, object, string, shape } from "prop-types";
import { withTheme } from "../themes/withTheme";

// import utility functions
import { StringOrElement, composeTheme, addThemeId } from "../utils";

// import constants
import { IDENTIFIERS } from "../themes/API";

type Props = {
  context: {
    theme: Object,
    ROOT_THEME_API: Object
  },
  disabled: boolean,
  label: string | Element,
  onBlur: Function,
  onChange: Function,
  onFocus: Function,
  selected: boolean,
  skin: Function,
  theme: Object,
  themeId: string,
  themeOverrides: Object
};

type State = {
  composedTheme: Object
};

class Radio extends Component<Props, State> {
  static propTypes = {
    context: shape({
      theme: object,
      ROOT_THEME_API: object
    }),
    disabled: bool,
    label: StringOrElement,
    onBlur: func,
    onChange: func,
    onFocus: func,
    selected: bool,
    skin: func.isRequired,
    theme: object,
    themeId: string,
    themeOverrides: object // custom css/scss from user that adheres to component's theme API
  };

  static defaultProps = {
    disabled: false,
    selected: false,
    theme: null,
    themeId: IDENTIFIERS.RADIO,
    themeOverrides: {}
  };

  constructor(props) {
    super(props);

    const { context, themeId, theme, themeOverrides } = props;

    this.state = {
      composedTheme: composeTheme(
        addThemeId(theme || context.theme, themeId),
        addThemeId(themeOverrides, themeId),
        context.ROOT_THEME_API
      )
    };
  }

  render() {
    // destructuring props ensures only the "...rest" get passed down
    const { skin: RadioSkin, theme, themeOverrides, ...rest } = this.props;

    return <RadioSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default withTheme(Radio);
