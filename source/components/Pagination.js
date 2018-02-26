import React, { Component } from 'react';
import { number, func, oneOf, bool, string, object, node } from 'prop-types';
import { StringOrElement } from '../utils';

class Pagination extends Component {
  static propTypes = {
    onChange: func,
    totalPages: number,
    currentPage: number,
    maxPagesToShow: number,
    showFirstLastNavButtons: bool,
    showFirstPage: bool,
    showLastPage: bool,
    responsive: bool,
    paginationMode: string,
    showInputModeTotalPages: bool,
    firstLabel: StringOrElement,
    lastLabel: StringOrElement,
    previousLabel: StringOrElement,
    nextLabel: StringOrElement,
    gapLabel: StringOrElement,
    slashLabel: StringOrElement,
    skin: func.isRequired,
    theme: object,
    themeAPI: object,
    themeOverrides: object // custom css/scss from user that adheres to component's theme API
  };

  static defaultProps = {
    currentPage: 1,
    showFirstLastNavButtons: false,
    showFirstPage: false,
    showLastPage: false,
    responsive: false,
    paginationMode: 'pages',
    showInputModeTotalPages: false,
    firstLabel: '<<',
    lastLabel: '>>',
    previousLabel: '<',
    nextLabel: '>',
    gapLabel: '...',
    slashLabel: '\u00A0/\u00A0',
    theme: {},
    themeAPI: { ...AUTOCOMPLETE_THEME_API },
    themeOverrides: {}
  };

  static contextTypes = {
    theme: object
  };

  constructor(props, context) {
    super(props);

    const { themeOverrides, themeAPI } = props;

    const theme =
      context && context.theme && context.theme.pagination
        ? context.theme.pagination
        : props.theme;

    this.state = {
      pageInputError: false,
      composedTheme: composeTheme(theme, themeOverrides, themeAPI)
    };
  }

  _getMaxPages() {
    if (this.props.maxPagesToShow) {
      return this.props.maxPagesToShow;
    } else if (this.props.responsive) {
      return 20;
    } else {
      return 7;
    }
  }

  render() {
    return <PaginationSkin rootRef={el => (this.rootElement = el)} />;
  }
}
