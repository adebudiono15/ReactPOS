import React from 'react'
import {Modal, Button, Form} from 'react-bootstrap' 
import { numberWithCommas } from '../utils/utils'

const ModalKeranjang = 
({
    showModal, 
    handleClose, 
    keranjangDetail, 
    jumlah, 
    harga_satuan,
    tambah,
    kurang,
    handleSubmit,
    changeHandler,
    totalHarga,
    hapusPesanan,
}) => {
    if(keranjangDetail){
        return (
            <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>
               <p className="mb-0" style={{fontSize: '20px'}}>{keranjangDetail.product.nama_barang}</p>
               <p  className="mb-0 mt-0" style={{fontSize: '18px'}}>
               {/* <p  className="mb-0 mt-0" style={{color: 'red', fontSize: '12px'}}> */}
                <strong> 
                    <small>
                        Rp. {numberWithCommas(keranjangDetail.product.harga)}
                    </small>
                </strong>
                </p>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Total Harga :</Form.Label>
                    <p>
                        <strong>
                                Rp. {numberWithCommas(totalHarga)}
                        </strong>
                    </p>
                    {/* <Form.Control 
                    type="number" 
                    name="harga_satuan" 
                    value={harga_satuan} 
                    onChange={(event) => changeHandler(event)}/> */}
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                   <Button variant="dark" size="sm" className="mr-2" onClick={ () => kurang()}>
                   <i class='bx bx-minus'></i>
                   </Button>
                        <strong>
                            {jumlah}
                        </strong>
                   <Button variant="dark" size="sm" className="ml-2" onClick={ () => tambah()}>
                   <i class='bx bx-plus'></i>
                   </Button>
                </Form.Group>
                <Button variant="dark" type="submit" size="sm">
                    Simpan
                </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleClose} size="sm" onClick={() => hapusPesanan (keranjangDetail.id)}>
            <i class='bx bx-trash' ></i> Hapus Pesanan
            </Button>
            </Modal.Footer>
        </Modal>
        )
    }else{
        return (
            <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>
                Kosong
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>Kosong</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        )
    }
 
}

export default ModalKeranjang
