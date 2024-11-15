import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import axios from "axios"; // Import axios

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    if (friendId === _id) {
      // Prevent adding oneself as a friend
      alert("You cannot add yourself as a friend!");
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:3001/users/${_id}/${friendId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(setFriends({ friends: response.data })); // Update friends in Redux store
    } catch (error) {
      console.error("Error updating friend:", error); // Handle error
    }
  };

  return (
    <FlexBetween justifyContent="space-between" width="100%">
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="45px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0); // Reload the profile page
          }}
        >
          <Typography
            color={palette.neutral.dark}
            variant="h5"
            fontWeight="500"
            marginTop={"-10px"}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {/* Hide IconButton if it's the user's own profile */}
      {friendId !== _id && (
        <IconButton
          onClick={patchFriend}
          sx={{
            backgroundColor: "#1212", // Light gray background
            color: "orange", // Icon color
            p: "0.6rem",
            // marginLeft: "16px", // You can remove this margin
            "&:hover": {
              backgroundColor: "", // Dark orange hover effect
              cursor: "pointer",
            },
          }}
        >
          {isFriend ? (
            <PersonRemoveOutlined
              sx={{ color: "orange", fontSize: "1.38rem", fontWeight: 800 }}
            />
          ) : (
            <PersonAddOutlined
              sx={{ color: "orange", fontSize: "1.38rem", fontWeight: "bold" }}
            />
          )}
        </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
