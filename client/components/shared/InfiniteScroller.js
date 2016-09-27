import React from 'react'
import ReactDOM from 'react-dom'

const getTopPosition = (prmDomElt) => {
  if(prmDomElt)
    return prmDomElt.offsetTop + getTopPosition(prmDomElt.offsetParent);
  return 0;
}

export default React.createClass({
  getDefaultProps: function () {
    return {
      htmlTag: 'table',
      htmlTagClass: 'table user-list-table',
      hasMore: false,
      loadMore: function() {},
      threshold: 250
    };
  },
  componentDidMount: function () {
    this.attachScrollListener();
  },
  componentDidUpdate: function () {
    this.attachScrollListener();
  },
  scrollListener: function () {
    let el = ReactDOM.findDOMNode(this);
    let scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if (getTopPosition(el) + el.offsetHeight - scrollTop - window.innerHeight < Number(this.props.threshold)) {
      this.detachScrollListener();
      // call loadMore after detachScrollListener to allow for non-async loadMore functions
      this.props.loadMore();
    }
  },
  attachScrollListener: function () {
    if(this.props.hasMore === false) {return;}

    window.addEventListener('scroll', this.scrollListener);
    window.addEventListener('resize', this.scrollListener);
    this.scrollListener();
  },
  detachScrollListener: function () {
    window.removeEventListener('scroll', this.scrollListener);
    window.removeEventListener('resize', this.scrollListener);
  },
  componentWillUnmount: function () {
    this.detachScrollListener();
  },
  render: function() {
    return (
      <this.props.htmlTag className={this.props.htmlTagClass}>{this.props.children}</this.props.htmlTag>
    );
  }
})
