
"use client";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './main-header.module.css'

export default function NavLink({ children, href }) {
    const pathName = usePathname();
    return (
        <Link href={href} className={pathName.startsWith(href) ? `${styles.link} ${styles.active}` : styles.link}
        >
            {children}
        </Link>
    );
}
