import {
  ManageAccountsOutlined,
  Edit,
  LocationOnOutlined,
  WorkOutlineOutlined,
  SchoolOutlined,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Friend from "components/Friend";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEducation, setOpenDialogEducation] = useState(false);
  const [openDialogWork, setOpenDialogWork] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const [newEducation, setNewEducation] = useState("");
  const [newWork, setNewWork] = useState("");
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const currentUserId = useSelector((state) => state.user._id);
  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data);
      setNewLocation(response.data.location);
      setNewEducation(response.data.education);
      setNewWork(response.data.work);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateUser = async (field, value) => {
    try {
      await axios.patch(
        `http://localhost:3001/users/${userId}`,
        { [field]: value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser((prevUser) => ({
        ...prevUser,
        [field]: value,
      }));
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    }
  };

  const handleSaveLocation = () => {
    updateUser("location", newLocation);
    setOpenDialog(false);
  };

  const handleSaveEducation = () => {
    updateUser("education", newEducation);
    setOpenDialogEducation(false);
  };

  const handleSaveWork = () => {
    updateUser("work", newWork);
    setOpenDialogWork(false);
  };

  if (!user) {
    return null;
  }

  const { firstName, lastName, location, friends, education, work } = user;

  return (
    <WidgetWrapper sx={{ position: "sticky", top: 5, zIndex: 100 }}>
      {/* FIRST ROW */}
      <Box sx={{marginBottom:"20px"}} >
        <Friend
          friendId={userId}
          userPicturePath={picturePath}
          name={firstName}
        />
        <Typography
          color={palette.neutral.medium}
          position="absolute"
          top={58} // تحريك النص لأسفل مباشرة تحت الاسم
          left={73} // محاذاة النص لليسار
           // إضافة مسافة صغيرة فوق النص إذا لزم الأمر
        >
          {friends.length} Follow
        </Typography>
      </Box>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined
            fontSize="medium"
            sx={{ color: palette.neutral.dark }}
          />
          <Typography color={palette.neutral.medium}>{location}</Typography>
          {currentUserId === userId && (
            <Box sx={{ marginLeft: "auto" }}>
              <IconButton
                sx={{
                  backgroundColor: "#1212",
                  color: "orange",
                  "&:hover": {
                    backgroundColor: "",
                  },
                }}
                onClick={() => {
                  setOpenDialog(true);
                  setNewLocation(location);
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>

      <Divider />

      {/* Dialog for Editing Location */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            backgroundColor:
              palette.mode === "dark" ? palette.background.default : "#fff",
            backdropFilter: "blur(10px)",
            borderRadius: "8px",
            padding: "1rem",
          },
        }}
        maxWidth="sm" // Adjust the size as needed
        fullWidth
      >
        <DialogTitle sx={{ color: palette.text.primary, fontWeight: "bold" }}>
          Edit Location
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Location"
            type="text"
            fullWidth
            variant="outlined"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            InputProps={{
              disableUnderline: true,
              sx: {
                borderBottom: `2px solid orange`,
                "&:hover": {
                  borderBottom: `2px solid orange`,
                },
                "&.Mui-focused": {
                  borderBottom: `2px solid orange`,
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: newLocation ? "orange" : "inherit", // Change color to orange when typing
                "&.Mui-focused": {
                  color: "orange", // Keep color orange when focused
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  display: "none",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              color: palette.error.dark,
              "&:hover": {
                backgroundColor: palette.error.light,
                color: "#fff",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveLocation}
            sx={{
              backgroundColor: "#1212",
              color: "orange",
              "&:hover": {
                backgroundColor: "",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Divider />

      {/* THIRD ROW - EDUCATION */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <SchoolOutlined
            fontSize="medium"
            sx={{ color: palette.neutral.dark }}
          />
          <Typography color={palette.neutral.medium}>{education}</Typography>
          {currentUserId === userId && (
            <Box sx={{ marginLeft: "auto" }}>
              <IconButton
                sx={{
                  backgroundColor: "#1212",
                  color: "orange",
                }}
                onClick={() => {
                  setOpenDialogEducation(true);
                  setNewEducation(education);
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>

      <Divider />

      {/* Dialog for Editing Education */}
      <Dialog
        open={openDialogEducation}
        onClose={() => setOpenDialogEducation(false)}
        PaperProps={{
          sx: {
            backgroundColor:
              palette.mode === "dark" ? palette.background.default : "#fff",
            borderRadius: "8px",
            padding: "1rem",
          },
        }}
        maxWidth="sm" // Same size as Location dialog
        fullWidth
      >
        <DialogTitle sx={{ color: palette.text.primary, fontWeight: "bold" }}>
          Edit Education
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Education"
            type="text"
            fullWidth
            variant="outlined"
            value={newEducation}
            onChange={(e) => setNewEducation(e.target.value)}
            InputProps={{
              disableUnderline: true,
              sx: {
                borderBottom: `2px solid ${palette.neutral.dark}`,
                "&:hover": {
                  borderBottom: `2px solid ${palette.primary.dark}`,
                },
                "&.Mui-focused": {
                  borderBottom: `2px solid ${palette.grey.light}`,
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: newEducation ? "orange" : "inherit", // Change color to orange when typing
                "&.Mui-focused": {
                  color: "orange", // Keep color orange when focused
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  display: "none",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialogEducation(false)}
            sx={{
              color: palette.error.dark,
              "&:hover": {
                backgroundColor: palette.error.light,
                color: "#fff",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveEducation}
            sx={{
              backgroundColor: "#1212",
              color: "orange",
              "&:hover": {
                backgroundColor: "",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Divider />

      {/* FOURTH ROW - WORK */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <WorkOutlineOutlined
            fontSize="medium"
            sx={{ color: palette.neutral.dark }}
          />
          <Typography color={palette.neutral.medium}>{work}</Typography>
          {currentUserId === userId && (
            <Box sx={{ marginLeft: "auto" }}>
              <IconButton
                sx={{
                  backgroundColor: "#1212",
                  color: "orange",
                }}
                onClick={() => {
                  setOpenDialogWork(true);
                  setNewWork(work);
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>


      {/* Dialog for Editing Work */}
      <Dialog
        open={openDialogWork}
        onClose={() => setOpenDialogWork(false)}
        PaperProps={{
          sx: {
            backgroundColor:
              palette.mode === "dark" ? palette.background.default : "#fff",
            borderRadius: "8px",
            padding: "1rem",
          },
        }}
        maxWidth="sm" // Same size as Location dialog
        fullWidth
      >
        <DialogTitle sx={{ color: palette.text.primary, fontWeight: "bold" }}>
          Edit Work
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Work"
            type="text"
            fullWidth
            variant="outlined"
            value={newWork}
            onChange={(e) => setNewWork(e.target.value)}
            InputProps={{
              disableUnderline: true,
              sx: {
                borderBottom: `2px solid ${palette.neutral.dark}`,
                "&:hover": {
                  borderBottom: `2px solid ${palette.primary.dark}`,
                },
                "&.Mui-focused": {
                  borderBottom: `2px solid ${palette.grey.light}`,
                },
              },
            }}
            InputLabelProps={{
              sx: {
                color: newWork ? "orange" : "inherit", // Change color to orange when typing
                "&.Mui-focused": {
                  color: "orange", // Keep color orange when focused
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  display: "none",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialogWork(false)}
            sx={{
              color: palette.error.dark,
              "&:hover": {
                backgroundColor: palette.error.light,
                color: "#fff",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveWork}
            sx={{
              backgroundColor: "#1212",
              color: "orange",
              "&:hover": {
                backgroundColor: "",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </WidgetWrapper>
  );
};

export default UserWidget;
