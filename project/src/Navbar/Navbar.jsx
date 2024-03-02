import Button from 'react-bootstrap/Button';
      import Container from 'react-bootstrap/Container';
      import Form from 'react-bootstrap/Form';
      import Nav from 'react-bootstrap/Nav';
      import Navbar from 'react-bootstrap/Navbar';
      import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../App.css';

import { useEffect, useState } from 'react';


export const NavbarComponent=()=>{

  const [windowSize, setWindowSize]=useState();

  useEffect(()=>{
    setWindowSize(window.innerWidth);
  },[])

    return(
    
          <Navbar expand="lg" className="navbar navbar-dark"  style={{position:"sticky", zIndex:2, backgroundColor:"transparent !important", }}
          >
            <Container fluid>
              <Navbar.Brand href="#" className='text-white' style={{width:"25vw", fontSize:"5vh", textAlign:"center"}}>Jetronics</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" className='my-custom-toggle' />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ margin:"0 auto", position:"relative"  }}
                 >
                  <Nav.Link href="#action1" className='custom-navs'>Home</Nav.Link>
                  <Nav.Link href="#action2" className='custom-navs' >Products</Nav.Link>
                  <Nav.Link href="#" className='custom-navs' >Deals</Nav.Link>
                </Nav>
               
              {/* <Navbar.Toggle aria-controls="catagories1" className='my-custom-toggle' /> */}
              {/* <Navbar.Collapse id="catagories1"> */}
                <NavDropdown title="Categories" id="navbarScrollingDropdown" style={{width:"10vw"}}>
                  <NavDropdown.Item href="#action3" className='custom-navs'>Phones</NavDropdown.Item>
                  <NavDropdown.Item href="#action4" className='custom-navs'>
                  Laptops
                  </NavDropdown.Item>
                  {/* <NavDropdown.Divider /> */}
                  <NavDropdown.Item href="#action5" className='custom-navs'>
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              {/* </Navbar.Collapse> */}

                {/* <Form className="d-flex " 
                // style={{width:"20%"}}
                >
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              <Nav style={{width:"15vw", display:"flex", justifyContent:"center"}}>
                  <Nav.Link href="#action2"  >Cart</Nav.Link>
                <Nav.Link href="#action2"   >Sign In</Nav.Link>
                  <Nav.Link href="#" >Sign up</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
  );
}

export default NavbarComponent;