import Header from "./Header"
import React, { ReactNode } from "react"

type Props = {
    children: ReactNode;
  };

const Layout: React.FC<Props> = ({children}) => {
    return (
        <>
            <div>
                <Header />
                <main>
                    {children}
                </main>
            </div>
        </>
    )
}

export default Layout