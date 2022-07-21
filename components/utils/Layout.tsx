import Header from "./Header"
import React, { ReactNode } from "react"
import { Divider } from "@nextui-org/react"

type Props = {
    children: ReactNode;
    dates: any;
    setDates: any;
  };

const Layout: React.FC<Props> = ({children, dates, setDates}) => {
    return (
        <>
            <div  className="mt-[1%]">
                <Header dates={dates} setDates={setDates} />
                <main>
                    {children}
                </main>
            </div>
        </>
    )
}

export default Layout