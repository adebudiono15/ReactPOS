import React, { Component } from 'react'
import {Button,Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {API_LOKAL} from '../utils/contants'
import axios from 'axios'

export default class Sukses extends Component {
    componentDidMount()
    {
        axios
        .get(API_LOKAL+"keranjangs")
        .then(res => {
          const keranjangs = res.data;
          keranjangs.map(function(item){
              return axios
              .delete(API_LOKAL+"keranjangs/"+item.id)
              .then((res) => console.log(res))
              .catch((error) => console.log(error))
          })
        })
        .catch(error =>{
        console.log(error)
        })
    }
    render() {
        return (
            <div className="mt-4 text-center">
                <Image src="assets/sukses.png" width="600"/>
                <p>Pesanan Sedang Di Proses...</p>
                <Button size="sm" variant="dark" as={Link} to="/">
                        Kembali
                </Button>
            </div>
        )
    }
}
