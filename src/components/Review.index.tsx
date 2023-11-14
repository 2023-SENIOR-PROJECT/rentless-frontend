// ReviewPanel.tsx
import React, { useState } from "react";
import { ReviewDTO } from "../types/Review";
import Card from "react-bootstrap/Card";
import { Button, Form, Modal } from "react-bootstrap";
import ReactStars from "react-rating-star-with-type";
import { useCreateReviewMutation } from "../hooks/reviewHooks";
import { useParams } from "react-router-dom";
import AddReviewButton from "./AddReviewButton";

interface ReviewProps {
  data: ReviewDTO;
}

const Review: React.FC<ReviewProps> = ({ data }) => {
  const { title, rate: rating, comment, created_at, name } = data;
  const params = useParams();

  const { id } = params;
  const createdAt = new Date(created_at);

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
        <AddReviewButton />
      </Card>
    </>
  );
};

export default Review;
