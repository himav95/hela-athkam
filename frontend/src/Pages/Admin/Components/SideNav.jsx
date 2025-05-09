import { Button, Card } from 'react-bootstrap';
import { CaretRight } from 'react-bootstrap-icons';
import { Link, useLocation } from 'react-router-dom';
import '../../../Asset/Style/Helaathkam_Page.css';

const SideNav = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Card className="mt-4">
      <Card.Body
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: '10px',
        }}
      >
        <Link to="/admin/dashboard" style={{ width: '100%' }}>
          <Button
            className={`listgroupButton mb-1 ${isActive('/admin/dashboard') ? 'active' : ''}`}
          >
            <CaretRight className="caretRight1" /> Dashboard
          </Button>
        </Link>

        <Link to="/admin/orderbulk" style={{ width: '100%' }}>
          <Button
            className={`listgroupButton mb-1 ${isActive('/admin/orderbulk') ? 'active' : ''}`}
          >
            <CaretRight className="caretRight1" /> Bulk Order Request
          </Button>
        </Link>


        <Link to="/admin/ordercustom" style={{ width: '100%' }}>
          <Button
            className={`listgroupButton mb-1 ${isActive('/admin/ordercustom') ? 'active' : ''}`}
          >
            <CaretRight className="caretRight1" /> Custom Order Request
          </Button>
        </Link>



        <Link to="/admin/product" style={{ width: '100%' }}>
          <Button
            className={`listgroupButton mb-1 ${isActive('/admin/product') ? 'active' : ''}`}
          >
            <CaretRight className="caretRight1" /> All Product
          </Button>
        </Link>

        <Link to="/admin/usermessages" style={{ width: '100%' }}>
          <Button
            className={`listgroupButton mb-1 ${isActive('/admin/usermessages') ? 'active' : ''}`}
          >
            <CaretRight className="caretRight1" /> Messages/Inquiry
          </Button>
        </Link>

        <Link to="/admin/craftmakerrequest" style={{ width: '100%' }}>
          <Button
            className={`listgroupButton mb-1 ${isActive('/admin/craftmakerrequest') ? 'active' : ''}`}
          >
            <CaretRight className="caretRight1" /> Craft Maker Request
          </Button>
        </Link>

        <Link to="/admin/craftmaker" style={{ width: '100%' }}>
          <Button
            className={`listgroupButton mb-1 ${isActive('/admin/craftmaker') ? 'active' : ''}`}
          >
            <CaretRight className="caretRight1" /> Craft Maker
          </Button>
        </Link>

        <Link to="/admin/user" style={{ width: '100%' }}>
          <Button
            className={`listgroupButton mb-1 ${isActive('/admin/user') ? 'active' : ''}`}
          >
            <CaretRight className="caretRight1" /> User
          </Button>
        </Link>
        
      </Card.Body>
    </Card>
  );
};

export default SideNav;
