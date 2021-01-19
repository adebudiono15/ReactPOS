import React from 'react'
import {Col, Card,Button} from 'react-bootstrap'
import {numberWithCommas} from '../utils/utils'

const Menus = ({ menu, masukKeranjang }) => {
    return (
        <Col md={4} xs={6} className="mb-4 text-center">
            <Card className="shadow">
                {/* <Card.Img variant="top" src={"assets/images/"+nama.kategori.nama} /> */}
                <Card.Img variant="top" src="assets/pro.jpeg" />
                <Card.Body>
                    <Card.Title><small>{menu.nama_barang}</small></Card.Title>
                    <Card.Text>
                       <small>Rp. {numberWithCommas(menu.harga)}</small>
                    </Card.Text>
                    <Button size="sm" variant="dark" onClick={() =>masukKeranjang(menu)}>Beli</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Menus
