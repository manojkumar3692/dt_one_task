import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductFilters from '../component/ProductFilters';
import { productList } from '../config/api';
interface Props {

}

export default function ProductPage({ }: Props): ReactElement {

    // Note:  you can set global loading using axios interceptor also
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [queryString, setQueryString] = useState('');
    const [clearQuery, setClearQuery] = useState(false);

    useEffect(() => {
        getProductList();
    }, [])


    const getProductList = async () => {
        setLoading(true);
        productList(queryString)
            .then((response: any) => {
                const { data } = response
                setProducts(data);
                setLoading(false);
                setQueryString('');
            })
            .catch((error) => {
                console.log('error', error)
                let { status } = error.response
                if (status === 404) {
                    setProducts([]);
                    setLoading(false);
                }
            })
    }

    const handleBytype = (value: string) => {
        let queryString = `&type=${value}`
        setQueryString(prevState => prevState.concat(queryString))
    }

    const handleByBenefit = (selectedBenifits: any) => {
        let filterSetter = selectedBenifits.filter((each: any) => each.isChecked === true).map(({ value }: any) => `${value}`).join(',')
        let queryString = `&benefit_types=${filterSetter}`;
        setQueryString(queryString)
    }



    const handleSubmit = (event: any) => {
        event.preventDefault();
        getProductList();
        setClearQuery(!clearQuery)
    }
    return (
        <>
            {
                loading && <Loading>Loading please wait ...</Loading>
            }
            <ProductFilters clean={clearQuery} triggerByType={handleBytype} triggerByBenefit={handleByBenefit} triggerSubmit={handleSubmit} />
            <ProductContainer>


                {
                    products && products.map((product: any, index: number) => {
                        return (
                            <ProductCard>
                                <h1>{product.name}</h1>
                                <ul>
                                    {
                                        product.benefits.map((item: any, index: number) => {
                                            return (

                                                <li key={index}>{item.type}</li>

                                            )
                                        })
                                    }
                                </ul>
                                <p>{product.description}</p>
                                <h2>{product?.prices?.retail?.unit} {product?.prices?.retail?.amount}</h2>
                            </ProductCard>
                        )
                    })
                }
                {
                    !loading && products.length === 0 && <Nodata>No data available</Nodata>
                }
            </ProductContainer>
        </>
    )
}

export const ProductContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
`

export const ProductCard = styled.div`
    flex-grow: 1;
    width: 30%;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin: 10px;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: #f9f9f9;
    }
    h1 {
        font-size: 14px;
    }
    p {
        font-size: 12px;
        min-height: 50px;
    }
    h2 {
        font-size: 13px;
        padding: 5px;
        width: 100px;
        margin: 0 auto;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        border-radius: 5px;
        background-color: #e1ecf4;    
        box-shadow: rgba(255, 255, 255, .7) 0 1px 0 0 inset;    
    }
    ul {
        text-decoration: none;
        padding: 0;
        margin: 0;
        li {
            font-size: 12px;
            display: inline-block;
            margin: 0px 5px;
            color : green;
            font-weight : bold;
        }
    }
`

export const Loading = styled.h1`
text-align: center;
padding : 1rem;
font-size: 14px;
`
export const Nodata = styled.h1`
text-align: center;
font-size: 14px;
color: red;
width: 100%;
`