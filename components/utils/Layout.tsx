import Header from "./Header"
import React, { ReactNode } from "react"
import { Divider } from "@nextui-org/react"

type Props = {
    children: ReactNode;
  };

const Layout: React.FC<Props> = ({children}) => {
    return (
        <>
            <div  className="mt-[1%]">
                <Header />
                <main>
                    {children}
                </main>
            </div>
        </>
    )
}

export default Layout