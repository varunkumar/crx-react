import React from 'react';
import icon from '../../assets/img/icon-128.png';

const GreetingComponent = () => {
  const [name] = React.useState('dev');

  return (
    <div>
      <p>Hello, {name}!</p>
      <img src={icon} alt="extension icon" />
    </div>
  );
};

export default GreetingComponent;
