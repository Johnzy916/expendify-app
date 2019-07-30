// Higher Order Components (HOC) - a component that renders another component
// Advantages -->
// Reuse code
// Render hijacking
// Prop manipulation
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

// const Info = (props) => (
//   <div>
//     <h1>Info</h1>
//     <p>The info is: {props.info}</p>
//   </div>
// );

// const withAdminWarning = (WrappedComponent) => {
//   return (props) => (
//     <div>
//       <p>This is private info. Please don't share!</p>
//       <WrappedComponent {...props} />
//     </div>

//   );
// }

// const AdminInfo = withAdminWarning(Info);

// ReactDOM.render(<AdminInfo info="These are the details" />, document.getElementById('app'));

const Info = props => (
  <div>
    <h1>Privileged Information</h1>
    <p>Your email is: {props.email}</p>
  </div>
);

const requireAuthentication = WrappedComponent => {
  return props => (
    <div>
      {props.isAuthenticated ?
        <WrappedComponent {...props} /> 
        : <p>Please log in to view your email address</p>}
    </div>
  );
};

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo
    isAuthenticated={false}
    email="your-email@stripe.com" />,
    document.getElementById('app'));