import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import stylesHeader from "../../styles/Header.module.css"
import { Text, Avatar, Button } from '@nextui-org/react'

const Header: React.FC = () => {

    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) =>
      router.pathname === pathname;

    const { data: session, status } = useSession();

    let left = (
        <ul>
            <li>
            <Text
                h4
                css={{
                    textGradient: "112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%"
                }}
            >
                <Link href="/">
                    <a data-active={isActive("/")}>
                        Home
                    </a>
                </Link>
            </Text>
            </li>
        </ul>
    )

    let right = null

    if(status === "loading") {
        left = (
            <ul>
                <Link href="/">
                    <a data-active={isActive("/")}>
                        Home
                    </a>
                </Link>
            </ul>
        )
        right = (
            <ul>
                <li>
                    <p>
                        Validating session...
                    </p>
                </li>
            </ul>
        )
    }

    if (!session) {
        right = (
            <ul>
                <li>
                    <Link href="/api/auth/signin">
                        <a data-active={isActive('/signup')}>Log in</a>
                    </Link>
                </li>
            </ul>
        )
    }

    if (session) {
        right = (
            <ul>
                <li>
                    <Link href="/profile">
                        <a data-active={isActive('/profile')}>
                            <Avatar src={session.user.image} size="xl" color="gradient" bordered />
                        </a>
                    </Link>
                </li>
            </ul>
        )
    }

    if (isActive("/profile")) {
        right = null
    }



    return (
        <nav className={stylesHeader.nav}>
            {left}
            {right}
        </nav>
    )
}

export default Header
