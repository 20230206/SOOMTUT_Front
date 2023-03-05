import styles from '../../assets/styles/components/navbar/navbar.module.css'

import { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

import logo from '../../assets/images/logo.png'
import login from '../../assets/images/navbar/login.png'
import register from '../../assets/images/navbar/register.png'

function SNavbar() {

  const [onMouseMenu1, setOnMouseMenu1] = useState(false);
  const [onMouseMenu2, setOnMouseMenu2] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  useEffect(() => {
    if(windowWidth > 990) setCollapsed(true)
    else setCollapsed(false)
  }, [windowWidth])

  return (
   <>
   <Navbar className={styles.wrap} collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand href="/">
            <img src={logo} className={styles.navlogo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
              { !collapsed &&
                <>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link eventKey={2} href="/login">Login</Nav.Link>
                </> }
              { collapsed && 
                <>
                  <Nav.Link href="/register">
                  <img
                   src={register}
                   className={`${styles.registericon} ${onMouseMenu1 ? styles.highlight : null}`}
                   alt="register"
                   onMouseEnter={() => setOnMouseMenu1(true)}
                   onMouseOut={() => setOnMouseMenu1(false)} />
                  </Nav.Link>
    
                  <Nav.Link eventKey={2} href="/login"> 
                    <img
                     src={login} 
                     className={`${styles.registericon} ${onMouseMenu2 ? styles.highlight : null}`}
                     alt="login"
                     onMouseEnter={() => setOnMouseMenu2(true)}
                     onMouseOut={() => setOnMouseMenu2(false)}  />
                  </Nav.Link>
                </>
              }
            </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
   </>
  );
}

export default SNavbar;