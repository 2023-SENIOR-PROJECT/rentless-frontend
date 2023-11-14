// ReviewPanel.tsx
import React, { useState } from "react";
import { ReviewDTO } from "../types/Review";
import Card from "react-bootstrap/Card";
import { Button, Form, Modal } from "react-bootstrap";
import ReactStars from "react-rating-star-with-type";
import { useCreateReviewMutation } from "../hooks/reviewHooks";
import { useParams } from "react-router-dom";

interface ReviewProps {
  data: ReviewDTO;
}

const Review: React.FC<ReviewProps> = ({ data }) => {
  const { title, rating, comment, createdAt, name } = data;
  const params = useParams();

  const { id } = params;

  const [show, setShow] = useState(false);
  const [star, setStar] = useState(0);
  const [commentText, setCommentText] = useState("");

  const onStarChange = (nextValue: number) => {
    setStar(nextValue);
  };

  const { mutateAsync: createReview, isLoading } = useCreateReviewMutation(id!);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentText(event.target.value);
  };
  const handleSubmit = () => {
    setShow(false);
    createReview({
      rate: star,
      comment: commentText,
    });
  };

  return (
    <>
      <Card style={{ width: "38rem", minHeight: "162px" }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {name}
            {" | "}
            {createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Card.Subtitle>
          <Card.Text>{comment}</Card.Text>
        </Card.Body>
        <Button onClick={handleShow} variant="secondary">
          Add your review
        </Button>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you are writing to this product !<hr></hr>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <strong>Rating</strong>
              </Form.Label>
              <ReactStars
                onChange={onStarChange}
                value={star}
                isEdit={true}
                activeColors={[
                  "red",
                  "orange",
                  "#FFCE00",
                  "#9177FF",
                  "#8568FC",
                ]}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="commentForm.ControlTextarea1"
            >
              <Form.Label>
                <strong>Comment</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={commentText}
                onChange={handleCommentChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Review;
