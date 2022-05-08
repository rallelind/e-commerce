import React from 'react'
import { Grid, Loading, Container } from "@nextui-org/react";
import ProductCard from '../../utils/ProductCard'
import { useSession  } from 'next-auth/react';
import { useState, useEffect } from 'react';



const UserProducts: React.FC<{ userProduct: [] }> = ({ userProduct }) => {

    if (userProduct.length === 0) return <h1>You have 0 products uploaded</h1> 

    return (
            <Grid xs={12}>
                <Grid.Container gap={4} justify="center">
                    {userProduct.length === 0 &&
                        <Loading size="xl" />
                    }
                    
                    {userProduct.map((post, i) => (
                        <ProductCard 
                            key={i}
                            onClick={null}
                            post={post} 
                            xs={12} 
                            sm={4} 
                            clickable={false} 
                            hoverable={false}/>
                    ))}
                    
                </Grid.Container>
            </Grid>
    )
}

export default UserProducts
