import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'
import stylesHeader from "../../styles/Header.module.css"
import { Text, Avatar, Button, User } from '@nextui-org/react'
import { DateRangePicker } from '@mantine/dates';
import { FcCalendar } from "react-icons/fc"

const Header: React.FC = () => {

    const router = useRouter();
    const isActive: (pathname: string) => boolean = (pathname) =>
      router.pathname === pathname;

    const { data: session, status } = useSession();

    const [dates, setDates] = useState<[Date | null, Date | null]>([
        new Date(),
        new Date(),
      ]);

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
                    <Link href="/auth/signin">
                        <a data-active={isActive('/signup')}>
                            <User 
                                src="https://mpng.subpng.com/20181110/srt/kisspng-computer-icons-login-scalable-vector-graphics-emai-5be7376911c6b4.4735764415418796570728.jpg"
                                name="Sign in"
                                bordered
                                color="gradient"
                                size='lg'
                            />
                        </a>
                    </Link>

                </li>
            </ul>
        )
    }

    if (session) {
        right = (
            <ul>
                <li>
                    <Link href="/profile/user-information">
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
            <ul className='flex justify-center'>
                <li>
                <DateRangePicker
                                    placeholder="Event date"
                                    required
                                    allowLevelChange={false}
                                    icon={<FcCalendar size={30} />}
                                    minDate={new Date()}
                                    disableOutsideEvents
                                    value={dates}
                                    onChange={setDates}
                                    className="w-[255px]"
                                />
                </li>
            </ul>
            {right}
        </nav>
    )
}

export default Header
