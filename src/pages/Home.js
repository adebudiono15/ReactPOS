import React, {Component} from 'react';
import {Row, Col,Container} from 'react-bootstrap';
import {Hasil, ListCategories,Menus} from '../components';
import {API_URL, API_LOKAL} from '../utils/contants'
import axios from 'axios'
import swal from 'sweetalert'

export default class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus : [],
       keranjangs : [],
    }
  }

  componentDidMount(){
    axios
    .get(API_URL+"barangs")
    .then(res => {
      // console.log(res)
      const menus = res.data;
      this.setState({ menus });
    })
    .catch(error =>{
    console.log(error)
    })

    

    axios
    .get(API_LOKAL+"keranjangs")
    .then(res => {
      // console.log(res)
      const keranjangs = res.data;
      this.setState({ keranjangs });
    })
    .catch(error =>{
    console.log(error)
    })
  }

  masukKeranjang = (value) => {
    axios
    .get(API_LOKAL+"keranjangs?product.id=" + value.id)
    .then(res => {
      if(res.data.length === 0){
        const keranjang = {
          jumlah : 1,
          total_harga : value.harga,
          product :value,
        }
        axios
        .post(API_LOKAL+"keranjangs", keranjang)
        .then(res => {
          this.getListKeranjang();
          swal({
            title: "Sukses",
            text: "Berhasil Masuk Keranjang",
            icon: "success",
            button: false,
            timer :1500,
          });
        })
        .catch(error =>{
        console.log(error)
        })
      }else{
        const keranjang = {
          jumlah : res.data[0].jumlah+1,
          total_harga : res.data[0].total_harga+value.harga,
          product :value,
        }
          axios
          .put(API_LOKAL+"keranjangs/"+res.data[0].id, keranjang)
          .then(res => {
            swal({
              title: "Sukses",
              text: "Berhasil Masuk Keranjang",
              icon: "success",
              button: false,
              timer :1500,
            });
          })
          .catch(error =>{
          console.log(error)
          })
      }
    })
    .catch(error =>{
    console.log(error)
    })
  }

  // componentDidUpdate(prevState){
  //   if(this.state.keranjangs !== prevState.keranjangs){
  //     axios
  //   .get(API_LOKAL+"keranjangs")
  //   .then(res => {
  //     // console.log(res)
  //     const keranjangs = res.data;
  //     this.setState({ keranjangs });
  //   })
  //   .catch(error =>{
  //   console.log(error)
  //   })
  //   }
  // }

  getListKeranjang = () => {
    axios
    .get(API_LOKAL+"keranjangs")
    .then(res => {
      // console.log(res)
      const keranjangs = res.data;
      this.setState({ keranjangs });
    })
    .catch(error =>{
    console.log(error)
    })
    
  }
  
  render() {
    const {menus, keranjangs} = this.state
    return (
      <div className="mt-4">
         <Container fluid>
             <Row>
               <ListCategories/>
                   <Col>
                       <h4><strong>Daftar Produk</strong></h4>
                       <hr/>
                          <Row className="overflow-auto menu">
                            {menus && menus.map((menu) => (
                             <Menus
                              key={menu.id}
                              menu = {menu}
                              masukKeranjang={this.masukKeranjang}
                             />
                            ))}
                          </Row>
                   </Col>
               <Hasil 
               keranjangs={keranjangs}
               {...this.props}
               getListKeranjang={this.getListKeranjang}
               />
         </Row>
         </Container>
      </div>
    )
  }
}