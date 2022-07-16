import { useState, useEffect } from "react"
import { Loading } from "@nextui-org/react"
import { Switch } from "@mantine/core"
import { useRouter } from "next/router"
import useRouterRefresh from "../../../lib/customHook/useRouterRefresh"

const SwitchUserRole = () => {

  const [hostStatus, setHostStatus] = useState(false)

  const userStatus = typeof window !== "undefined" && window.sessionStorage.getItem("userStatus")

  useEffect(() => {
      if(userStatus === "user" || userStatus === null) {
        setHostStatus(false)
      } else {
        setHostStatus(true)
      }
  }, [userStatus])


  const switchOnChange = async (event) => {
    setHostStatus(event)
    if(event === true) {
      window.sessionStorage.setItem("userStatus", "host")
    } else {
      window.sessionStorage.setItem("userStatus", "user")
    }
  }

    return (
          <>
            <Switch
              color="grape"
              label={`Switch to ${hostStatus ? "user" : "host"}`}
              checked={hostStatus}
              onChange={(event) => setHostStatus(event.currentTarget.checked)}
            />
          </>
    )
}

export default SwitchUserRole