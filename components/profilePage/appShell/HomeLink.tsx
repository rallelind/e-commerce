import { Text } from "@nextui-org/react"
import Link from "next/link"

const HomeLink = () => {
    return (
        <Text
        h4
        css={{
          textGradient: "112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%"
        }}
      >
        <Link href="/">
          <a>
            Home
          </a>
        </Link>
      </Text>
    )
}

export default HomeLink