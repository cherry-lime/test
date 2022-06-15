import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import Divider from "@mui/material/Divider";

//  a card consist of:
//  title with a small logo
//  a seperator line (divider)
//  a body text
//  optionally: an JPEG image at the right side and/or left side
//  title divider and body text are aligned left
//  the card title and body text are darkgrey according style
//  the logo in the title is ING orange
//  the color of the JPG/PNG image must be set in the image itself (in this case also ING orange)
//  there might be an image on the left or on the right or both

//  pagecard
//  textcolor is text
//  alignment is left
//  font of title is bold (weight is 600)
//  title of the card is set to "Individual Evaluation"
//  title might be changed
type PageCardProps = {
  headerText: string;
  bodyText: string;
  cardHeight: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  image: string;
  isImageLeft?: boolean;
  isImageRight?: boolean;
};
const defaultProps = {
  isImageLeft: false,
  isImageRight: false,
}

function CardImage(ch: string, img: string) {
  return (
    <CardMedia
      component="img"
      sx={{
        minWidth: "33vw",
        width: "33vw",
        height: ch,
        opacity: 0.4,
      }}
      image={img}
      alt="ING image"
    />
  );
}

export default function PageCard({
  bodyText,
  headerText,
  cardHeight,
  icon,
  image,
  isImageLeft,
  isImageRight,
}: PageCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        verticalAlign: "middle",
        width: "100vw",
        borderRadius: "20px",
      }}
    >
      {/* if Cardmedia,add image to the left side */}
      {isImageLeft && CardImage(cardHeight, image)}
      {/* set the width of the card */}
      <Box width="100vw" height={cardHeight} bgcolor="white">
        <CardContent>
          {/* Use align="left" if alignment of title, divider and body text is left and JPG/PNG image is on the right, reverse if otherwise
           */}
          <Typography
            color="text.secondary"
            align="left"
            sx={{ fontWeight: 600,
              display: "flex",
              alignItems: "center"
             }}
            variant="h6"
          >
            {/* Here should be the title of the card
             */}
            {headerText}
            {icon}
          </Typography>
          {/* Use textAlign="left" if alignment of title, divider and body text is left and JPG/PNG image is on the right, reverse if otherwise
           */}
          <Divider textAlign="left" />
          {/* Use align="left" if alignment of title and body text is left and JPG/PNG image is on the right, reverse if otherwise
           */}
          <Typography
            variant="subtitle1"
            align="left"
            color="text.secondary"
            component="div"
          >
            {bodyText}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }} />
      </Box>
      {/* if Cardmedia,add image to the right side */}
      {isImageRight && CardImage(cardHeight, image)}
    </Card>
  );
}
PageCard.defaultProps = defaultProps;