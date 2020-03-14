import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
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
          <div className='truncate'>
            <a className='ui grey header'>{url.destination}</a>
          </div>
          <div>
            <a className='ui grey header'>{url.slug}</a>
          </div>
          <div>
            <div className='ui grey small header'>Count: {url.count}</div>
            <CopyToClipboard
              text={`http://localhost:3001/api/urls/${url.slug}`}
            >
              <div className='ui content button primary'>Copy</div>
            </CopyToClipboard>
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
