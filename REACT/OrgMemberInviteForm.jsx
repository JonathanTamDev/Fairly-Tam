import React , {useEffect, useState} from "react";
import { Formik, Field } from "formik";
import { Button, Card, Col, Row, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import organizationMemberService from "../../services/organizationMemberService";
import orgMemberFormSchema from "../../schemas/orgMemberFormSchema";
import * as lookUpService from "../../services/lookUpService";

function OrgMemberInviteForm() {
  const formData = { email: "", firstName: "", lastName: "", userRoleTypeId: ""};
  const [roleArr, setRoleArr] = useState([]);

  useEffect(()=>{
    lookUpService.getTypes(["Roles"])
      .then(lookUpSuccess)
      .catch(lookUpError)
  },[]);

  function lookUpSuccess (res) {
    setRoleArr(() => {
      let newState = res.item.roles;
      newState = newState
        .filter(option => (option.id >= 2 && option.id <= 4))
        .map(option => (<option key={option.id} value={option.id}>{option.name}</option>));
      return newState;
    });
  }

  function lookUpError (err) {
    Swal.fire({
      icon: "error",
      title: err,
      confirmButtonText: "Okay",
    })
  }

  const handleSubmit = (values) => {
    organizationMemberService
      .inviteOrgMember(values)
      .then(userGetSuccess)
      .catch(userGetError);
  };

  function userGetSuccess(response) {
    let actionText = "";
    if (response.item.key === "invite")
    {
      actionText = `Invite Email has been sent`;
    }
    else
    {
      actionText = "Member added to your Organization";
    }
    Swal.fire({
      icon: "success",
      title: `Success!`,
      text: actionText,
      confirmButtonText: "Ok",
    });
  }

  function userGetError(err) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response.data.errors,
      confirmButtonText: "Okay",
    })
  }

  return (
    <Container className="mt-3">
      <Row className="justify-content-center g-0 min-vh-100">
        <Col lg={8} md={8} className="py-4 py-xl-0">
        <Card>
          <Card.Header>
            <Card.Title className="d-flex justify-content-center">
              <h1 className="text-primary">Invite a Member to Your Organization</h1>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Formik
              validationSchema={orgMemberFormSchema}
              initialValues={formData}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, handleChange, values, touched, errors, resetForm }) => (
                <Row>
                  <Col>
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="email"
                          >
                            <Form.Label>Email</Form.Label>
                            <Field
                              type="text"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              className={
                                errors.email && touched.email
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                            {errors.email && touched.email && (
                              <span className="input-feedback text-danger">
                                {errors.email}
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="firstName"
                          >
                            <Form.Label>FirstName</Form.Label>
                            <Field
                              type="text"
                              name="firstName"
                              value={values.firstName}
                              onChange={handleChange}
                              className={
                                errors.firstName && touched.firstName
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                            {errors.firstName && touched.firstName && (
                              <span className="input-feedback text-danger">
                                {errors.firstName}
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="lastName"
                          >
                            <Form.Label>Last Name</Form.Label>
                            <Field
                              type="text"
                              name="lastName"
                              value={values.lastName}
                              onChange={handleChange}
                              className={
                                errors.lastName && touched.lastName
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                            {errors.lastName && touched.lastName && (
                              <span className="input-feedback text-danger">
                                {errors.lastName}
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Form.Group
                            className="mb-3"
                            controlId="userRoleTypeId"
                          >
                            <Form.Label>User Role</Form.Label>
                            <Field
                              as="select"
                              name="userRoleTypeId"
                              value={values.userRoleTypeId}
                              onChange={handleChange}
                              className={
                                errors.userRoleTypeId && touched.userRoleTypeId
                                  ? "form-control error"
                                  : "form-control"
                              }
                            >
                              <option value="">Please Select a Role ...</option>
                              {(roleArr.length !== 0) && roleArr}
                            </Field>
                            {errors.userRoleTypeId && touched.userRoleTypeId && (
                              <span className="input-feedback text-danger">
                                {errors.userRoleTypeId}
                              </span>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="d-grid gap-2 d-md-flex justify-content-md-start">
                          <Button type="submit">
                            Invite Member
                          </Button>
                        </Col>
                        <Col className="d-grid gap-2 d-md-flex justify-content-md-end">
                          <Button className="btn-danger" onClick={resetForm}>
                            Reset
                          </Button>
                          <Link className="btn btn-secondary" to="./../list">
                            Back
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              )}
            </Formik>
          </Card.Body>
        </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OrgMemberInviteForm;
