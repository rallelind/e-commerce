import { useState, useEffect } from "react"
import { Loading } from "@nextui-org/react"
import { Switch } from "@mantine/core"
import { useRouter } from "next/router"
import useRouterRefresh from "../../../lib/customHook/useRouterRefresh"

const SwitchUserRole = ({ hostStatus, switchOnChange }) => {

    return (
          <>
            <Switch
              color="grape"
              label={`Switch to ${hostStatus ? "user" : "host"}`}
              checked={hostStatus}
              onChange={(event) => switchOnChange(event.currentTarget.checked)}
            />
          </>
    )
}

export default SwitchUserRole