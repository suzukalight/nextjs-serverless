import * as React from 'react';
import { NextPage } from 'next';
import { useQuery } from '@apollo/react-hooks';

import { GET_ME } from './query';

interface IndexPresenterProps {
  username: string;
  userAgent: string;
}

const IndexPresenter: React.FC<IndexPresenterProps> = ({ username, userAgent }) => (
  <div>
    <p>
      hello nextjs. your username is <strong>{username}</strong>
    </p>
    <small>{`userAgent = ${userAgent}`}</small>
  </div>
);

interface IndexProps {
  userAgent: string;
}

const Index: NextPage<IndexProps> = ({ userAgent }) => {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error!</p>;

  const { username } = data.me;
  return <IndexPresenter username={username} userAgent={userAgent} />;
};

Index.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
  return { userAgent };
};

export default Index;
