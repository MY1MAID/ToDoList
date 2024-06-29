import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Slide, Zoom } from "react-awesome-reveal";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const FullScreenScroll = ({ sections }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const navigate = useNavigate();
  const handleLoginButtonClick = () => {
    navigate("/login");
  };
  const handleScroll = (event) => {
    if (isScrolling) return; // Предотвращаем многократную прокрутку

    if (event.deltaY > 0) {
      setCurrentSection((prev) => (prev < sections - 1 ? prev + 1 : prev));
    } else {
      setCurrentSection((prev) => (prev > 0 ? prev - 1 : prev));
    }

    setIsScrolling(true); // Устанавливаем состояние прокрутки
    setTimeout(() => {
      setIsScrolling(false); // Сбрасываем состояние прокрутки после задержки
    }, 1000); // Задержка 1 секунда
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isScrolling]);

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <IconButton
        sx={{
          position: "absolute",
          right: 10,
          top: 10,
          borderRadius: "50%",
          zIndex: 1,
        }}
      >
        <LoginOutlinedIcon onClick={handleLoginButtonClick} />
      </IconButton>
      <div
        style={{
          transform: `translateY(-${currentSection * 100}vh)`,
          transition: "transform 1.5s ease",
        }}
      >
        <div style={{}}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              minHeight: "100vh",
              height: "100vh",
            }}
          >
            <Typography variant="h1" gutterBottom>
              Welcome to ToDoList
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "left",
              padding: 5,
              flexBasis: "50vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "left",
              width: "60%",
            }}
          >
            <Slide duration={1500} direction="left">
              <Typography variant="h5" paragraph>
                Organize your life with our user-friendly and intuitive task
                management app.
              </Typography>
            </Slide>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              height: "100vh",
              display: "flex",
              alignItems: "space-between",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Our functions are in action
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Zoom>
                  <Box
                    sx={{
                      height: 100,
                      backgroundColor: "#e0f7fa",
                      borderRadius: 2,
                    }}
                  />
                  <Typography paragraph>
                    Ease of creating and managing tasks.
                  </Typography>
                </Zoom>
              </Grid>
              <Grid item xs={12} md={4}>
                <Zoom delay={250}>
                  <Box
                    sx={{
                      height: 100,
                      backgroundColor: "#e0f7fa",
                      borderRadius: 2,
                    }}
                  />
                  <Typography paragraph>
                    A convenient calendar for planning.
                  </Typography>
                </Zoom>
              </Grid>
              <Grid item xs={12} md={4}>
                <Zoom delay={500}>
                  <Box
                    sx={{
                      height: 100,
                      backgroundColor: "#e0f7fa",
                      borderRadius: 2,
                    }}
                  />
                  <Typography paragraph>
                    Powerful collaboration tools.
                  </Typography>
                </Zoom>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              textAlign: "left",
              py: 5,
              padding: 5,
              gap: 2,
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Frequently Asked Questions (FAQ)
            </Typography>
            <Slide
              direction="left"
              duration={1100}
              fraction={0.001}
              easing="ease-out-in"
            >
              <Typography variant="h6">
                How do I start using ToDoMaster?
              </Typography>
              <Typography paragraph>Just sign up and get started.</Typography>
            </Slide>
            <Slide
              direction="left"
              duration={1500}
              fraction={0.001}
              easing="ease-out-in"
            >
              <Typography variant="h6">
                What features are available in the free version?
              </Typography>
              <Typography paragraph>
                The free version includes all the basic functions for managing
                tasks, but it has some limitations on the number of tasks and
                lists.
              </Typography>
            </Slide>
            <Slide
              direction="left"
              duration={1900}
              fraction={0.001}
              easing="ease-out-in"
            >
              <Typography variant="h6">
                Is it possible to use ToDoMaster on different devices?
              </Typography>
              <Typography paragraph>
                Yes, you can use ToDoMaster on your computer, tablet and
                smartphone. All data is synchronized automatically.
              </Typography>
            </Slide>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default FullScreenScroll;
