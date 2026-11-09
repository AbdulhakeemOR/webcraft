import { Component, Fragment } from "react";

export default class PreviewBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      attempt: 0,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  retry = () => {
    this.setState((current) => ({
      hasError: false,
      attempt: current.attempt + 1,
    }));
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="preview-error" role="alert">
          <span className="preview-error-symbol" aria-hidden="true">
            !
          </span>

          <strong>This example could not be displayed.</strong>

          <p>
            Try restarting {this.props.name || "the preview"}.
            Other parts of the library are still available.
          </p>

          <button type="button" onClick={this.retry}>
            Restart preview
          </button>
        </div>
      );
    }

    return (
      <Fragment key={this.state.attempt}>
        {this.props.children}
      </Fragment>
    );
  }
}