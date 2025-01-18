import { Card, Button } from 'react-bootstrap' ;
function Home () {
    return (
        <div>
            <h1>Home</h1>
            <p>This is the Home Page.</p>
            <Card>
                <Card.Header>Featured</Card.Header>
                <Card.Body>
                    <Card.Title>Special Title Treatment</Card.Title>
                    <Card.Text>
                    With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant='Primary'>Go Somewhere</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
export default Home