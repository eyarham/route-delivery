import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div>

      <div>welcome</div>
      <div>we are trying to do the thing</div>
      <Link to="/signup">create an account</Link> to get started
    </div>
  )
}

export default Home