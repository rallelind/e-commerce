import { useState } from "react"
import { Loading } from "@nextui-org/react"
import { Switch } from "@mantine/core"
import useRouterRefresh from "../../../lib/customHook/useRouterRefresh"

const SwitchUserRole = ({ userHostStatus }) => {

    const [loadingUserHost, setLoadingUserHost] = useState(false)
    const [checked, setChecked] = useState(userHostStatus)

    const refresh = useRouterRefresh()

    const switchOnChange = async (event) => {
        setChecked(event)
        try {
          setLoadingUserHost(true)
          const body = { checked: event }
          await fetch("/api/user/update-host", {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
          })
        } catch (error) {
          console.log(error)
        } finally {
          refresh()
            .then(() => setLoadingUserHost(false))
        }
      }

    return (
        <div>
        {loadingUserHost ?
          <Loading />
          :
          <>
            <Switch
              color="grape"
              label={`Switch to ${userHostStatus ? "user" : "host"}`}
              checked={checked}
              onChange={(event) => switchOnChange(event.currentTarget.checked)}
            />
          </>
        }
      </div>
    )
}

export default SwitchUserRole