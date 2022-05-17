import { getProviders, signIn, useSession } from "next-auth/react"
import { Card, Container, Text, Spacer, Divider } from "@nextui-org/react"
import Image from "next/image"
import GoogleLogin from "../../components/utils/social-login/GoogleLogin"
import GithubLogin from "../../components/utils/social-login/GithubLogin"
import loginStyles from "../../styles/LoginStyles.module.css"

export default function SignIn({ providers }) {
  console.log(providers)
  return (
    <div>
        <Card shadow={true} className={loginStyles.container}>
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
                <div key={provider.name} onClick={() => signIn(provider.id, { redirect: true, callbackUrl: "/profile" })} style={{ marginBottom: "3%" }}>
                  {provider.name === "Google" && <GoogleLogin />}
                  {provider.name === "GitHub" && <GithubLogin />}
                </div>
              ))}
            </Container>
            <Spacer y={1} />
          </Card.Body>
        </Card>
        <div className={loginStyles.leftCorner}>
          <Image src="/illustrations/leftCorner.jpg" height="400" width="600"/>
        </div>
        <div className={loginStyles.rightCorner}>
          <Image src="/illustrations/rightCorner.jpg" height="400" width="600"/>
        </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}