import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  ...(props) => ({
    transform: props.expand ? "rotate(180deg)" : "rotate(0deg)",
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, borderRadius: "14px" }}>
  <CardContent>
  <img
    src="../../../gaza.jpg"
    alt="gaza"
    style={{ width: "100%", borderRadius: "14px" }} 
  />
</CardContent>

      <CardContent>
       
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon sx={{ color: "red" }} />
        </IconButton>

        <IconButton aria-label="share">
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
             Remembering Palestine
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
          ✊ In this relentless war against the ruthless occupying enemy, the people of Gaza stand as a symbol of unwavering courage and sacrifice. Each day, they face unimaginable hardships, yet their spirit remains unbroken. The resistance bravely strikes back, inflicting losses on the oppressor while protecting their land, the sacred Al-Aqsa Mosque, and the honor of all Muslims. This struggle is not just for survival; it is a fierce battle for dignity, freedom, and the rightful return to their homeland. The fight of the Palestinian people is a fight for the honor of Islam and all Muslims worldwide. The world must not turn a blind eye to their plight, for their fight is a fight for justice, humanity, and the sanctity of our faith.          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            🕌 Jerusalem, the heart of Palestine, is home to Al-Aqsa Mosque, the third holiest site in Islam. It symbolizes unity, peace, and the centuries-old history of the region.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            ✊ As we enjoy our lives, let's take a moment to remember the ongoing hardships in Gaza and Palestine, and stand in solidarity with those who fight for their land and dignity.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
