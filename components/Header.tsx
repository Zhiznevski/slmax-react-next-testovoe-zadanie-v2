import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <header>
      <Link href="/">Home</Link>
      <Link href="login">LogIn</Link>
    </header>
  );
}

export default Header;
