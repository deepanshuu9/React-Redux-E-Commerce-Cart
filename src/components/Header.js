import React, { useEffect } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { DLT } from '../redux/actions/action';

const Header = () => {

    const [price, setPrice] = useState(0);

    const getData = useSelector((state) => state.cartreducer.carts);

    const dispatch = useDispatch();

    const dlt = (id) => {
        dispatch(DLT(id))
    }

    const total = () => {
        let price = 0;
        getData.map((ele, k) => {
            price = ele.price * ele.qnty + price
        });
        setPrice(price);
    };

    useEffect(() => {
        total();
    }, [total])

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" style={{ height: '60px' }}>
                <Container>
                    <NavLink to="/" className='text-decoration-none text-light mx-3' style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Food Cart</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/" className='text-decoration-none text-light' style={{ fontSize: '1.5rem' }}>Home</NavLink>
                    </Nav>

                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <Badge badgeContent={getData.length} color="primary">
                            <i class="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: 'pointer' }}></i>
                        </Badge>
                    </Button>


                </Container>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    {
                        getData.length ?
                            <div className='card_details' style={{ width: '24rem', padding: 10 }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Resturant Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData.map((e) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>
                                                                <NavLink to={`/cart/${e.id}`} onClick={handleClose}><img src={e.imgdata} alt="" style={{ width: '5rem', height: '5rem' }} /></NavLink>
                                                            </td>
                                                            <td>
                                                                <p>{e.rname}</p>
                                                                <p>Price : ₹ {e.price}</p>
                                                                <p>Quantity : {e.qnty}</p>
                                                                <p style={{ color: 'red', fontSize: 20, cursor: 'pointer' }} onClick={() => dlt(e.id)}><i className='fas fa-trash smalltrash'></i></p>
                                                            </td>
                                                            <td className='mt-5' style={{ color: 'red', fontSize: 20, cursor: 'pointer' }} onClick={() => dlt(e.id)}>
                                                                <i className='fas fa-trash largetrash'></i>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        <p className='text-center'>Total : ₹ {price}</p>
                                    </tbody>
                                </Table>
                            </div> :
                            <div className='card_details d-flex justify-content-between align-align-items-center' style={{ width: '18rem', padding: 10, position: 'relative' }}>
                                <i className='fas fa-close smallclose' onClick={handleClose} style={{ position: 'absolute', top: 2, right: 20, fontSize: 23, cursor: 'pointer' }}></i>
                                <p style={{ fontSize: 22 }}>Your Cart is Empty</p>
                                <img className='emptycart_img' style={{ width: '5rem', padding: 10 }} src="./cart.gif" alt="" />
                            </div>
                    }



                </Menu>
            </Navbar>
        </>
    )
}

export default Header