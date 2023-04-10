import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

function Categories() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleCategory = (event) => {
    const { target } = event;
    setCategory(target.value);
  };

  const removeCategory = (category) => {
    console.log(category);
    setCategories(categories.filter((item) => item.category !== category));
    console.log(categories);
  };

  const handleCategoryCreation = (event) => {
    event.preventDefault();
    setCategories((prevCategories) => [
      ...prevCategories,
      {
        category,
      },
    ]);
    setCategory("");
  };

  return (
    <>
      <Button className="category mx-2" variant="primary" onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCategoryCreation}>

            <Form.Group className="mb-3">
              <Form.Label>New category:</Form.Label>
              <Form.Control
                required
                type="text"
                id="category"
                placeholder="Enter new category"
                onChange={handleCategory}
                value={category}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                className="mx-2"
                variant="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                className="mx-2"
                type="submit"
                variant="primary"
              >
                Add Category
              </Button>
            </div>
          </Form>

          <Table striped hover>
            <thead className="bg-light">
              <tr>
                <th
                  scope="col"
                  className="text-center text-sm font-medium text-dark px-6 py-3"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="text-center text-sm font-medium text-dark px-6 py-3"
                >
                  Category Name
                </th>
                <th
                  scope="col"
                  className="text-center text-sm font-medium text-dark px-3 py-3"
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {!!categories.length &&
                categories.map((categorys, index) => (
                  <tr key={index} className="bg-white ">
                    <td className="text-center text-sm text-gray-900 font-light px-1 py-3 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="text-center text-sm text-gray-900 font-light px-1 py-3 whitespace-nowrap">
                      {categorys.category}
                    </td>
                    <td className="text-center text-sm text-gray-900 font-light px-1 py-3 whitespace-nowrap">
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCategory(categorys.category)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Categories;
