import { handleLoggedIn } from "./getUser";

export default App => {
  return class WithUser extends React.Component {
    static displayName = `WithUser(${App.displayName})`;

    static async getInitialProps(ctx) {
      const { res, apolloClient } = ctx && ctx.ctx;
      const { loggedInUser: user } = await handleLoggedIn(apolloClient);
      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }
      if (res && res.finished) {
        return {};
      }
      return {
        ...appProps,
        user
      };
    }
    constructor(props) {
      super(props);
      this.user = props.user;
    }
    render () {
      return <App {...this.props} user={this.user} />;
    }
  }
}