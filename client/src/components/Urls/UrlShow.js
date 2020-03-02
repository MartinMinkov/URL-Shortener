import React from "react";
import { connect } from "react-redux";
import { fetchURL } from "../../actions";

class UrlShow extends React.Component {
  componentDidMount() {
    this.props.fetchURL();
  }

  renderList = () => {
    console.log("props", this.props);
    return this.props.urls.map(url => {
      return (
        <div className='urlListContainer' key={url.id}>
          <div>
            <a className='ui grey header'>{url.formValues.url}</a>
          </div>
          <div>
            <a className='ui grey header'>url.123ve</a>
          </div>
          <div>
            <div className='ui grey small header'>Count: 123</div>
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

export default connect(mapStateToProps, { fetchURL })(UrlShow);
