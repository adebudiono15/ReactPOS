import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col, Button } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'
import {API_LOKAL, API_TELEGRAM, API_URL} from '../utils/contants'

export default class TotalBayar extends Component {
 
    sumbitTotalBayar = (totalBayar) => {

         // send pejualan
        //  const penjualan ={
        //     nama_customer : 'tesnama',
        //     nama : this.props.keranjangs[0].namas,
        //     grand_total : totalBayar,
        //     kode_customer: 'teskode',
        //     alamat: 'tesalamat',
        //     telepon: '111'
        // }

        // axios.post(API_URL+"penjualanapi", penjualan).then((res) => {
        //     this.props.history.push('/sukses')
        // })


        const pesanan ={
            total_bayar : totalBayar,
            barang :this.props.keranjangs,
        }
        axios.post(API_LOKAL+"pesanans", pesanan).then((res) => {
            this.props.history.push('/sukses')
        })

       

        // Send boot
        const ngetes = ('hallo')
        axios
          .get(API_TELEGRAM+ngetes)
          .then(res => {
           
          })
          .catch(error =>{
          console.log(error)
          })
    }

    render() {
        const totalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0);
        return (
            <>
            {/* web */}
            <div className="fixed-bottom d-none d-md-block">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h5>Total : <strong className="float-right mr-2">Rp. {numberWithCommas(totalBayar)}</strong></h5>
                        <Button variant="dark" className="mb-3 mt-2" block size="sm" onClick={ () => this.sumbitTotalBayar(totalBayar)}>
                            <strong>SELESAI BELANJA</strong>
                        </Button>
                    </Col>
                </Row>
            </div>

            {/* mobile */}
            <div className="d-sm-block d-md-none">
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className="px-4">
                        <h5>Total : <strong className="float-right mr-2">Rp. {numberWithCommas(totalBayar)}</strong></h5>
                        <Button variant="dark" className="mb-3 mt-2" block size="sm" onClick={ () => this.sumbitTotalBayar(totalBayar)}>
                            <strong>SELESAI BELANJA</strong>
                        </Button>
                    </Col>
                </Row>
            </div>
            </>
        )
    }
}
