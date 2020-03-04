import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createURL } from "../../actions";

class UrlCreate extends React.Component {
  onSubmit = propsValues => {
    if (this.props.isSignedIn) {
      this.props.createURL(propsValues);
    } else {
      console.log("Need to be signed in");
    }
  };

  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className='ui negative message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, meta }) => {
    const className = `urlInput ${meta.error && meta.touched ? "error" : ""}`;

    return (
      <div className={className}>
        <input
          {...input}
          autoComplete='off'
          placeholder='Shorten your link...'
        />
        {this.renderError(meta)}
      </div>
    );
  };

  render() {
    return (
      <form
        className='ui form'
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className='urlInputContainer'>
          <Field name='url' component={this.renderInput} />
          <button className='ui button primary urlSubmitButton'>Shorten</button>
        </div>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.url) {
    errors.url = "You must enter a title";
  }
  if (!validURL(formValues.url)) {
    errors.url = "You must enter a valid url";
  }
  return errors;
};

// https://stackoverflow.com/a/5717133
const validURL = str => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

const formWrapped = reduxForm({
  form: "urlCreate",
  validate
})(UrlCreate);

export default connect(mapStateToProps, {
  createURL
})(formWrapped);
