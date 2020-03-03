import React from "react";
import { connect } from "react-redux";
import { fetchURLS } from "../../actions";

class UrlShow extends React.Component {
  componentDidMount() {
    this.props.fetchURLS();
  }

  renderList = () => {
    return this.props.urls.map(url => {
      return (
        <div className='urlListContainer' key={url._id}>
          <div>
            <a className='ui grey header'>{url.slug}</a>
          </div>
          <div>
            <a className='ui grey header'>url.123ve</a>
          </div>
          <div>
            <div className='ui grey small header'>Count: {url.count}</div>
            <div className='ui content button primary'>Copy</div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className='ui middle aligned divided list'>{this.renderList()}</div>
    );
  }
}

const mapStateToProps = state => {
  return { urls: Object.values(state.urls) };
};

export default connect(mapStateToProps, { fetchURLS })(UrlShow);
