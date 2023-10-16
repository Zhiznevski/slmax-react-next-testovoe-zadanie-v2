"use client"

import { useSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import styles from './Header.module.css';

function Header() {
  const session = useSession()
  console.log(session.data?.user?.name)
  return (
    <header className={styles.header}>
      <Link className={styles.link} href="/">Home</Link>
      {session.data && (<Link className={styles.link}  href="Favorites">Favorites</Link>)}
      {session.data ? (<Link className={styles.link} href="#" onClick={() => signOut({callbackUrl: "/"})}>LogOut</Link>): <Link className={styles.link} href="/api/auth/signin">LogIn</Link> }
    </header>
  );
}

export default Header;
