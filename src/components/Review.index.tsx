// ReviewPanel.tsx
import React from "react";
import { ReviewDTO } from "../types/Review";
import Card from "react-bootstrap/Card";

interface ReviewProps {
  data: ReviewDTO;
}

const Review: React.FC<ReviewProps> = ({ data }) => {
  const { title, rating, comment, createdAt, name } = data;

  return (
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
    </Card>
  );
};

export default Review;
