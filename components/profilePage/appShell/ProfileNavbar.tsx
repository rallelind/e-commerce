import { useEffect, useState } from "react";
import { Navbar } from "@mantine/core";
import { useSession } from "next-auth/react";
import { Divider } from "@nextui-org/react";
import ProfileButton from "../ProfileButtons";
import { User } from "../UserNavbar";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { GiSurferVan } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { FiUpload, FiLogOut } from "react-icons/fi";
import { AiOutlineShop, AiFillEdit, AiOutlineMessage } from "react-icons/ai";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

const ProfileNavbar = ({ userHost }) => {
    
  const { data: session } = useSession();
  const { query } = useRouter()

  const [ownerSeen, setOwnerSeen] = useState(true)
  const [userSeen, setUserSeen] = useState(true)
  const [productOrders, setProductOrders] = useState([])
  const [userOrders, setUserOrders] = useState([])

  console.log()

  const userStatus = typeof window !== "undefined" && window.sessionStorage.getItem("userStatus")

  /*useEffect(() => {

      const fetchUserOrders = async () => {
        await fetch("/api/orders/userOrders")
          .then((res) => res.json())
          .then((data) => setUserOrders(data))
      }

      fetchUserOrders()

      const fetchProductOrders = async () => {
        await fetch("/api/orders/productOrders")
          .then((res) => res.json())
          .then((data) => setProductOrders(data)) 
      }

      const checkUserSeen = () => {
        return userOrders.map((userOrder) => {
          if (userOrder.userSeen === false) {
            setUserSeen(false)
          } else {
            setUserSeen(true)
          }
        })
      }
    
      const checkOwnerSeen = () => {
        return productOrders.map((productOrder) => {
          if (productOrder.ownerSeen === false) {
            setOwnerSeen(false)
          } else {
            setOwnerSeen(true)
          }
        })
      }

      fetchProductOrders()


      checkOwnerSeen()
    


    checkUserSeen()
    

  }, [])*/

  const router = useRouter()

  const navigateProfilePage = async (url, userOrder, productOrder) => {
    router.push({pathname: `/profile/${url}`})

    if (userOrder) {
        try {
          await fetch("/api/orders/hasSeen/userSeen")
        } catch (error) {
          console.log(error)
        } finally {
          setUserSeen(true)
        }
      }
  
      if (productOrder) {
        try {
          await fetch("/api/orders/hasSeen/ownerSeen")
        } catch (error) {
          console.log(error)
        } finally {
          setOwnerSeen(true)
        }
      }
  }

  const profileButtonsData = [
    {
      label: "View Profile",
      color: "grape",
      onClick: () => navigateProfilePage("user-information", false, false),
      icon: <CgProfile size={25} />,
      host: null
    },
    {
      label: "Upload Product",
      color: "green",
      onClick: () => navigateProfilePage("upload-product", false, false),
      icon: <FiUpload size={25} />,
      host: true,
    },
    {
      label: "Your Products",
      color: "blue",
      onClick: () => navigateProfilePage("user-products", false, false),
      icon: <AiOutlineShop size={25} />,
      host: true,
    },
    {
      label: "Manage Products",
      color: "blue",
      onClick: () => navigateProfilePage("manage-products", false, false),
      icon: <AiFillEdit size={20} />,
      host: true,
    },
    {
      label: "Ordered Trips",
      color: "green",
      onClick: () => navigateProfilePage("user-orders", true, false),
      icon: <GiSurferVan size={30} />,
      userSeen: userSeen,
      host: false,
    },
    {
      label: "Product orders",
      color: "green",
      onClick: () => navigateProfilePage("product-orders", false, true),
      icon: <BiPurchaseTagAlt size={25} />,
      ownerSeen: ownerSeen,
      host: true,
    },
    {
      label: "Inbox",
      color: "grape",
      onClick: () => navigateProfilePage("/inbox/user", false, false),
      icon: <AiOutlineMessage size={25} />,
      host: false,
    },
    {
      label: "Inbox",
      color: "grape",
      onClick: () => navigateProfilePage("/inbox/host", false, false),
      icon: <AiOutlineMessage size={25} />,
      host: true,
    },
    {
      label: "Sign out",
      color: "red",
      onClick: () => signOut({ redirect: true, callbackUrl: "/" }),
      icon: <FiLogOut size={25} />,
      host: null
    },
  ];

  return (
    <>
      <Navbar.Section grow>
        {profileButtonsData.map((buttonData, i) => {
          if ((userStatus === null || userStatus === "user") && !buttonData.host) {
            return (
              <ProfileButton
                key={i}
                buttonData={buttonData}
              />
            );
          }
          if ((userStatus === "host" && buttonData.host) || buttonData.host === null) {
            return (
              <ProfileButton
                key={i}
                buttonData={buttonData}
              />
            );
          }
        })}
      </Navbar.Section>
      <Navbar.Section>
        <Divider y={1} />
        <User
          avatar={session?.user.image}
          userName={session?.user.name}
          userData={session?.user.email}
        />
      </Navbar.Section>
    </>
  );
};

export default ProfileNavbar;
