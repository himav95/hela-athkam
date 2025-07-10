import { Button, Card, Container } from 'react-bootstrap';
import {PersonFill, BagFill, Person } from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom';

// imort Hela athkam page css here.
import '../../../Asset/Style/Helaathkam_Page.css';

const ProfileSide = () => {
    const Location = useLocation();

    const isActive = (path) => Location.pathname === path;

    return(

        <Card>
            <Card.Body
            style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '10px',}}
            >
            
            <Container style={{width:"4rem",
              height:"5rem",
              backgroundColor:"#EEEEEE",
              alignItems:"center",
              display:"flex",
              justifyContent:"center"}}
              className='mb-3 mt-2'>

              <Person style={{width: "10rem",
                height:"12rem",
                color:"grey"}}/>
            </Container>

                
            <Link to="/user/userprofileedit" style={{ width: '100%' }}>
              <Button className={`listgroupButton mb-2 ${isActive('/user/userprofileedit') ? 'active' : ''}`}>
              <PersonFill style={{fontSize:"large"}} className="ms-1 me-2" /> My Profile
              </Button>
            </Link>

             <Link to="/user/purchases" style={{ width: '100%' }}>
              <Button className={`listgroupButton mb-1 ${isActive('/user/purchases') ? 'active' : ''}`}>
              <BagFill className="ms-1 me-2" /> My Purchase History
              </Button>
            </Link>
                
            </Card.Body>
        </Card>
    )
}

export default ProfileSide;