
import React from 'react'
import Link from 'next/link';
import logoImg from '@/assets/logo.png';
import styles from './main-header.module.css'
import Image from 'next/image';
import HeaderBackground from './header-background';
import NavLink from './nav-link';

export default function MainHeader() {
    return (
        <>
            <HeaderBackground />
            <header className={styles.header}>
                <Link href='/' className={styles.logo}>
                    <Image src={logoImg} alt="A plate with food on it" width={100} height={100} priority />
                    NextLevel food
                </Link>
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <NavLink href="/meals">Browse Meals</NavLink>
                        </li>
                        <li>
                            <NavLink href="/community">Join Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}
