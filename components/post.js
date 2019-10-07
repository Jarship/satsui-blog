import React from 'react';
import Link from "next/link";
import Wrapper from './styled-post';

const PostItem = ({ post }) => (
  <Wrapper>
    <Link href="/[post]" as={`/${post.title}`}>
      <a>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </a>
    </Link>
  </Wrapper>
);

export default PostItem;
