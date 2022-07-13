import { getProviders, signIn, useSession } from "next-auth/react"
import { Card, Container, Text, Spacer, Divider } from "@nextui-org/react"
import Image from "next/image"
import GoogleLogin from "../../components/utils/social-login/GoogleLogin"
import GithubLogin from "../../components/utils/social-login/GithubLogin"
import loginStyles from "../../styles/LoginStyles.module.css"
import { useMediaQuery } from "@mantine/hooks"

export default function SignIn({ providers }) {

  const matches = useMediaQuery("(min-width: 1200px)")
  const sm = useMediaQuery("(min-width: 500px)")

  console.log(providers)
  return (
    <div>
        <Card shadow={sm ? true : false} className={loginStyles.container}>
          <Card.Body>
            <Image src="/illustrations/loginCard.jpg" height="200" width="400" />
            <Text css={{
              textGradient: "112deg, #06B7DB -63.59%, #FF4ECD -20.3%, #0072F5 70.46%",
            }} h4 style={{ textAlign: "center" }}>Sign in with the methods below to continue</Text>
            <Spacer y={1} />
            <Divider />
            <Spacer y={1} />
            <Container className={loginStyles.center}>
              {Object.values(providers).map((provider: any) => (
                <div key={provider.name} onClick={() => signIn(provider.id, { redirect: true, callbackUrl: "/profile/user-information" })} style={{ marginBottom: "3%" }}>
                  {provider.name === "Google" && <GoogleLogin />}
                  {provider.name === "GitHub" && <GithubLogin />}
                </div>
              ))}
            </Container>
            <Spacer y={1} />
          </Card.Body>
        </Card>
        <div className={matches ? loginStyles.leftCorner : loginStyles.displayMiddle}>
          <Image src="/illustrations/leftCorner.jpg" height="400" width="600"/>
        </div>
        <div className={matches ? loginStyles.rightCorner : loginStyles.displayNone}>
          <Image src="/illustrations/rightCorner.jpg" height="400" width="600"/>
        </div>
    </div>
  )
}

export async function getServerSideProps({context, res}) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const providers = await getProviders()
  return {
    props: { providers },
  }
}
