import React, { ReactElement, useState, useEffect } from 'react'
import styled from 'styled-components'

interface Props {
    triggerByType: (value: string) => void;
    triggerByBenefit: (selectedBenefits: any) => void;
    triggerSubmit: (value: any) => void;
    clean: boolean;
}




export default function ProductFilters({ clean, triggerByType, triggerByBenefit, triggerSubmit }: Props): ReactElement {
    const BenefitsList = [
        {
            id: 1,
            value: 'TALKTIME',
            text: 'TALKTIME',
            isChecked: false,
        },
        {
            id: 2,
            value: 'DATA',
            text: 'DATA',
            isChecked: false,
        },
        {
            id: 3,
            value: 'SMS',
            text: 'SMS',
            isChecked: false,
        },
        {
            id: 4,
            value: 'PAYMENT',
            text: 'PAYMENT',
            isChecked: false,
        },
        {
            id: 5,
            value: 'CREDITS',
            text: 'CREDITS',
            isChecked: false,
        }
    ]
    const [selectedBenefits, setSelectedBenifits] = useState(BenefitsList);
    const [selectedType, setSelectedType] = useState('');


    useEffect(() => {
        setSelectedType('')
        setSelectedBenifits(BenefitsList)
    }, [clean])
    const handleCheckbox = (event: any) => {
        let selectedId = event.target.value
        let isChecked = event.target.checked
        let filterArr: any = selectedBenefits.map((each) => {
            if (each.id === Number(selectedId)) {
                each.isChecked = isChecked
                return each
            }
            return each
        })
        setSelectedBenifits(filterArr);
        triggerByBenefit(filterArr);
    }
    const handleType = (event: any) => {
        setSelectedType(event.target.value);
        triggerByType(event.target.value);
    }
    return (
        <>

            <ProductFilterContainer>

                <ProductTypeSelection>

                    <select value={selectedType} onChange={(event) => handleType(event)}>
                        <option value="" disabled selected>Search By Type</option>
                        <option value="FIXED_VALUE_RECHARGE">FIXED VALUE RECHARGE</option>
                        <option value="RANGED_VALUE_RECHARGE">RANGED VALUE RECHARGE</option>
                        <option value="FIXED_VALUE_PIN_PURCHASE">FIXED VALUE PIN PURCHASE</option>
                        <option value="RANGED_VALUE_PIN_PURCHASE">RANGED VALUE PIN PURCHASE</option>
                        <option value="RANGED_VALUE_PAYMENT">RANGED VALUE PAYMENT</option>
                    </select>

                </ProductTypeSelection>

                <ProductTypeSelection>
                    <CheckboxContainer>
                        {
                            selectedBenefits.map((each, index) => {
                                return (
                                    <>
                                        <Checkbox checked={each.isChecked} key={index} onChange={handleCheckbox} type="checkbox" value={each.id} />
                                        <CheckboxLabel key={each.value + index}>{each.text}</CheckboxLabel>
                                    </>
                                )
                            })
                        }
                    </CheckboxContainer>


                </ProductTypeSelection>

                <ProductTypeSelection>

                    <button type="button" onClick={(event) => triggerSubmit(event)}>Search</button>

                </ProductTypeSelection>

                <ProductTypeSelection>


                </ProductTypeSelection>

            </ProductFilterContainer>

        </>
    )
}

export const ProductFilterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;
`

export const ProductTypeSelection = styled.div`
flex-grow: 1;
width: 30%;
box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
padding: 10px;
select {
    height: 40px;
    width: 100%;
}
input['text'] {
    height: 35px;
    width: 100%;
}
button {
        font-size: 13px;
        padding: 5px;
        width: 100px;
        margin: 0 auto;
        border-radius: 5px;
        background-color: #e1ecf4;    
        box-shadow: rgba(255, 255, 255, .7) 0 1px 0 0 inset;   
        outline: none;
}
`

export const Checkbox = styled.input`
    display: inline-block;
`

export const CheckboxLabel = styled.label`
    display: inline-block;
    font-size: 12px;
    margin-right: 10px;
    vertical-align: center;
`

export const CheckboxContainer = styled.div`
    line-height: 40px;
`