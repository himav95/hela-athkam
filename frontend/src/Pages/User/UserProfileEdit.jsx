import {Form, Button, Card, Alert, Container} from 'react-bootstrap';
import {UserProfileValidation} from'../../Asset/Script/UserProfileValidation';


function UserProfileEdit () {

    const initialData = {
        name: "Amara",
        email: "amaravijakone@gmail.com",
        phone: "+716587987",
        address: "no 123, vedra avenue, galle.",

    };

    const {
        formData,
        isEditing,
        errors,
        success,
        handleChange,
        handleSave,
        handleCancel,
        setIsEditing,
    } = UserProfileValidation(initialData);


    return (

       <Container className="mt-5 ms-5">
      <Card style={{width: "70%"}}>
        <Card.Header style={{backgroundColor: "#176B87", color:"white"}}>
          <h3>User Profile</h3>
        </Card.Header>
        <Card.Body>
          {success && <Alert variant="success">{success}</Alert>}

          <Form>
            {/* Name Field */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            {/* Email Field */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            {/* Phone Field */}
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>

            {/* Address Field */}
            <Form.Group className="mb-3">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            {/* Action Buttons */}
            <div className="d-flex gap-2">
              {!isEditing ? (
                <Button variant="primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button variant="success" onClick={handleSave}>
                    Save Changes
                  </Button>
                  <Button variant="outline-danger" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container> 
    );
};


export default UserProfileEdit;