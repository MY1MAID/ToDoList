import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Tilt from "react-parallax-tilt";

const gradients = [
  "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  "linear-gradient(45deg, #66BB6A 30%, #B2FF59 90%)",
  "linear-gradient(45deg, #FFEB3B 30%, #FFC107 90%)",
  "linear-gradient(45deg, #8E24AA 30%, #FF4081 90%)",
];

const TodoList = ({ list, index }) => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        color="primary"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%%",
        }}
      >
        <Tilt
          tiltMaxAngleX={-25}
          tiltMaxAngleY={-25}
          scale={1.1}
          transitionSpeed={1000} // Переход скорости в миллисекундах
          style={{
            height: "200px",
            width: "200px",
            transition: "transform 1s ease-out", // Переход для плавного возвращения
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              width: "200px",
              border: "1px solid gray",
              padding: 2,
              boxSizing: "border-box",
              borderRadius: 3,
              cursor: "pointer",
              background: gradients[index % gradients.length],
            }}
            onClick={() => navigate(`/list/${list._id}`)}
          >
            <Typography variant="h6">{list.name}</Typography>
          </Box>
        </Tilt>
      </Box>
    </>
  );
};

export default TodoList;
