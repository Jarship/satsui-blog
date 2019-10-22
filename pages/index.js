import PropTypes from "prop-types";
import { useEffect } from "react";
import Link from "next/link";
import Layout from '../components/layout';
import Feed from '../components/feed';
import { withApollo } from "../lib/apollo";

const IndexPage = ({ links }) => {
  useEffect(() => console.log('Links are ', links));
  return (
    <Layout>
      <Link href="/new_post">
          <a>
            Make a new post!
          </a>
        </Link>
      <Feed />
    </Layout>
  );
};

IndexPage.propTypes = {
  links: PropTypes.array
};

export default withApollo(IndexPage);