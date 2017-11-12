import React from 'react';
import { Link } from 'react-router-dom';


export default function NotFoundPage() {
  return (
    <div>
      <h3>Page not found. Go to <Link to='/'>main</Link> page</h3>
    </div>
  );
}