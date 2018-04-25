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
  isAligningRight: boolean,
  isBounded: boolean,
  isOpeningUpward: boolean,
  isTransparent: boolean,
  skin: Function,
  theme: Object,
  themeOverrides: Object,
  themeId: string,
  tip: string | Element
};

type State = {
  composedTheme: Object
};

class Tooltip extends Component<Props, State> {
  static propTypes = {
    context: shape({
      theme: object,
      ROOT_THEME_API: object
    }),
    isAligningRight: bool,
    isBounded: bool,
    isOpeningUpward: bool,
    isTransparent: bool,
    skin: func.isRequired,
    theme: object,
    themeOverrides: object, // custom css/scss from user that adheres to component's theme API
    themeId: string,
    tip: StringOrElement
  };

  static defaultProps = {
    isOpeningUpward: true,
    isTransparent: true,
    theme: null,
    themeId: IDENTIFIERS.TOOLTIP,
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
    const { skin: TooltipSkin, theme, themeOverrides, ...rest } = this.props;

    return <TooltipSkin theme={this.state.composedTheme} {...rest} />;
  }
}

export default withTheme(Tooltip);
