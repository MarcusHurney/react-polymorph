import React from 'react';
import _ from 'lodash';

export default props => {
  const PageButton = () => (
    <a
      key={pageNumber + '-' + index}
      data-hook={`page-${pageNumber}`}
      aria-label={`Page ${pageNumber}`}
      className={classes.pageButton}
      tabIndex={pageUrl ? null : 0}
      onClick={e => this.props.onPageClick(e, pageNumber)}
      onKeyDown={e => this.props.onPageKeyDown(e, pageNumber)}
      href={pageUrl ? pageUrl(pageNumber) : null}
    >
      {pageNumber}
    </a>
  );

  return (
    <nav
      ref={props.rootRef}
      role="navigation"
      aria-label="Pagination Navigation"
      className={classes.root}
      dir={this.props.rtl ? 'rtl' : null}
      style={width ? { width } : null}
    >
      {this.renderNavButton(ButtonType.Next)}
      {this.renderNavButton(ButtonType.Prev)}

      {_.times(props.totalPages, index => (
        <PageButton key={index} pageNumber={index + 1} />
      ))}

      {showFirstLastNavButtons && this.renderNavButton(ButtonType.First)}
      {showFirstLastNavButtons && this.renderNavButton(ButtonType.Last)}
    </nav>
  );
};
