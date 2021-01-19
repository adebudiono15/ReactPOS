import React, { Component} from 'react'
import {Col, ListGroup, Row, Badge,Card} from 'react-bootstrap' 
import { numberWithCommas } from '../utils/utils'
import TotalBayar from './TotalBayar'
import ModalKeranjang from './ModalKeranjang'
import { API_LOKAL} from '../utils/contants'
import axios from 'axios'
import swal from 'sweetalert'

export default class Hasil extends Component {
    constructor(props){
        super(props)
        this.state = {
            showModal :false,
            keranjangDetail : false,
            jumlah:0,
            totalHarga : 0,
        }
    }

    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail:  menuKeranjang,
            jumlah : menuKeranjang.jumlah,
            harga_satuan : menuKeranjang.product.harga,
            totalHarga : menuKeranjang.total_harga,
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false,
        })
    }

    tambah = () => {
        this.setState({
            jumlah : this.state.jumlah+1,
            totalHarga : this.state.keranjangDetail.product.harga*(this.state.jumlah + 1)
        })
    }

    kurang = () => {
        if(this.state.jumlah !== 1){
            this.setState({
                jumlah : this.state.jumlah-1,
                totalHarga : this.state.keranjangDetail.product.harga*(this.state.jumlah - 1)
            })
        }
    }


    changeHandler = (event) => {
       this.setState({
           harga_satuan: event.target.value
       })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
          }
          axios
          .put(API_LOKAL+"keranjangs/"+this.state.keranjangDetail.id, data)
          .then(res => {
              this.props.getListKeranjang();
            swal({
              title: "Update Pesanan",
              text: "Berhasil Update Pesanan",
              icon: "success",
              button: false,
              timer :1500,
            });
          })
          .catch(error =>{
          console.log(error)
          })
          this.handleClose();
    }

    hapusPesanan = (id) => {
     
          axios
          .delete(API_LOKAL+"keranjangs/"+id)
          .then(res => {
            this.props.getListKeranjang();
            swal({
              title: "Hapus Pesanan",
              text: "Berhasil Hapus Pesanan",
              icon: "warning",
              button: false,
              timer :1500,
            });
          })
          .catch(error =>{
          console.log(error)
          })

          this.handleClose();
    }
    render() {
        const {keranjangs} = this.props
        return (
            <Col md={3} mt={2}>
                <h4><strong>Keranjang</strong></h4>
                <hr/>
                    {keranjangs.length !== 0 && (
                        <Card className="overflow-auto shadow hasil">
                            <ListGroup variant="flush">
                            {keranjangs.map((menuKeranjang) =>
                                <ListGroup.Item key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)}>
                                    <Row>
                                        <Col xs={2}>
                                        <Badge variant="primary" className="mt-3">{menuKeranjang.jumlah}</Badge>
                                        </Col>
                                        <Col xs={6}>
                                            <p className="mb-0"><small>{menuKeranjang.product.nama_barang}</small></p>
                                            <p className="mb-0"><small><b>Rp. {numberWithCommas(menuKeranjang.product.harga)}</b></small></p>
                                        </Col>
                                        <Col>
                                            <p className="float-right"><small><b>{numberWithCommas(menuKeranjang.total_harga)}</b></small></p>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                        <ModalKeranjang 
                        handleClose={this.handleClose} 
                        {...this.state} 
                        tambah={this.tambah} 
                        kurang={this.kurang} 
                        changeHandler={this.changeHandler} 
                        handleSubmit={this.handleSubmit}
                        hapusPesanan={this.hapusPesanan}
                        />
                        </ListGroup>
                        </Card>
                    )}
                    <TotalBayar keranjangs={keranjangs} {...this.props}/>
            </Col>
        )
    }
}
