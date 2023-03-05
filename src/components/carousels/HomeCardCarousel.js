

import { Carousel, Card } from "react-bootstrap";

import example from "../../assets/images/example.jpg"

function HomeCardCarousel() {

    return (
        <>
         <Carousel variant="dark" style={{width:"1000px"}} interval={null} >
      <Carousel.Item>
       <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

      <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={example} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                </Card.Body>
                </Card>
                
      <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={example} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                </Card.Body>
                </Card>
                
      <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={example} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                </Card.Body>
                </Card>
                </div>
      </Carousel.Item>
      <Carousel.Item>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

<Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={example} />
          <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
              </Card.Text>
          </Card.Body>
          </Card>
          
<Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={example} />
          <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
              </Card.Text>
          </Card.Body>
          </Card>
          
<Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={example} />
          <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
              </Card.Text>
          </Card.Body>
          </Card>
          </div>
      </Carousel.Item>
      <Carousel.Item>
      <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>

<Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={example} />
          <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
              </Card.Text>
          </Card.Body>
          </Card>
          
<Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={example} />
          <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
              </Card.Text>
          </Card.Body>
          </Card>
          
    <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={example} />
          <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
              </Card.Text>
          </Card.Body>
          </Card>
          </div>
      </Carousel.Item>
    </Carousel>
        </>
    )
}
export default HomeCardCarousel;