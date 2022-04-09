import React from 'react'
import { Grid, Loading, Container } from "@nextui-org/react";
import ProductCard from './ProductCard'
import { useSession  } from 'next-auth/react';
import { useState, useEffect } from 'react';



const UserProducts: React.FC = (props) => {

    const { data: session } = useSession();

    const [userProduct, setUserProduct] = useState([])

    useEffect(() => {
        fetch("api/product/user-products")
        .then(res => res.json())
        .then(data => setUserProduct(data))
    }, [])

    console.log(userProduct)

    if(!session) {
        return (
            <h1>You need to be authenticated</h1>
        )
    }

    return (
        <Grid xs={5}>
            <Grid.Container gap={4} justify="center">
                {userProduct.length === 0 &&
                        <Loading size="xl" />
                }
                  
                {userProduct.map((post) => (
                    <ProductCard key={post.id} post={post} />
                ))}
                
            </Grid.Container>
        </Grid>
    )
}

export default UserProducts
