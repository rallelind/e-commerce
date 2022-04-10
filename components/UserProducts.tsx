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


    return (
        <Grid xs={5}>
            <Grid.Container gap={4} justify="center">
                {userProduct.length === 0 &&
                        <Loading size="xl" />
                }
                  
                {userProduct.map((post) => (
                    <ProductCard key={post.id} post={post} xs={12} sm={6} />
                ))}
                
            </Grid.Container>
        </Grid>
    )
}

export default UserProducts
