import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    404! What the heck? <Link to="/">Take me home</Link>
  </div>
);

export default NotFoundPage;