import { IconButton } from "@mui/material";
import UpwardIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import DownwardIcon from "@mui/icons-material/KeyboardDoubleArrowDown";

export function RenderEditCell({
  handleUpward,
  handleDownward,
}: {
  handleUpward: () => void;
  handleDownward: () => void;
}) {
  return (
    <div className="parent">
      <div className="child">
        <IconButton onClick={handleUpward}>
          <UpwardIcon />
        </IconButton>
      </div>
      <div className="child">
        <IconButton onClick={handleDownward}>
          <DownwardIcon />
        </IconButton>
      </div>
    </div>
  );
}

export const a = 0;
