import { useState, useEffect } from "react"
import { Loading } from "@nextui-org/react"
import { Switch } from "@mantine/core"
import { useRouter } from "next/router"
import useRouterRefresh from "../../../lib/customHook/useRouterRefresh"

const SwitchUserRole = ({ setHostStatus, hostStatus }) => {

    const [loadingUserHost, setLoadingUserHost] = useState(false)


    return (
        <div>
        {loadingUserHost ?
          <Loading />
          :
          <>
            <Switch
              color="grape"
              label={`Switch to ${hostStatus ? "user" : "host"}`}
              checked={hostStatus}
              onChange={setHostStatus}
            />
          </>
        }
      </div>
    )
}

export default SwitchUserRole