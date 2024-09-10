// src/components/CookieExample.jsx
import React, { useState } from 'react';

// Funciones para manejar cookies
export const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
};

const CookieExample = () => {
  const [cookieValue, setCookieValue] = useState(getCookie('myCookie') || '');

  const handleSetCookie = () => {
    setCookie('myCookie', 'testValue', 7); // Establecer cookie por 7 días
    setCookieValue('testValue');
  };

  return (
    <div>
      <button onClick={handleSetCookie}>Set Cookie</button>
      <p>Cookie Value: {cookieValue}</p>
    </div>
  );
};

export default CookieExample;
