import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { connect } from "react-redux";
import { fetchURLS, deleteURL } from "../../actions";

class UrlShow extends React.Component {
  state = {
    copyPressed: false
  };

  componentDidMount() {
    this.props.fetchURLS();
  }

  onDeleteClick = urlId => {
    this.props.deleteURL(urlId);
  };

  renderCopyConfirmation = () => {
    if (this.state.copyPressed) {
      return (
        <div className='elementToFadeInAndOut ui positive message'>
          <i
            onClick={() => this.setState({ copyPressed: false })}
            className='close icon'
          ></i>
          <div className='header'>Copied! :)</div>
        </div>
      );
    }
  };

  showCopyConfirmation = () => {
    this.setState({ copyPressed: true }, () => {
      setTimeout(() => {
        this.setState({ copyPressed: false });
      }, 3000);
    });
  };

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
              <div
                onClick={() => this.showCopyConfirmation()}
                className='ui content button primary'
              >
                Copy
              </div>
            </CopyToClipboard>
          </div>
          <div onClick={() => this.onDeleteClick(url._id)} className='icon'>
            <i className='ui large close icon'></i>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className='ui middle aligned divided list'>
        {this.renderCopyConfirmation()}
        {this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { urls: Object.values(state.urls) };
};

export default connect(mapStateToProps, {
  fetchURLS,
  deleteURL
})(UrlShow);
