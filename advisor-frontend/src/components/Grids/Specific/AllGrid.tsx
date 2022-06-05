import { createTheme } from '@mui/material/styles';

import ExampleGrid from './ExampleGrid';
import TeamGrid from './TeamGrid';
import MemberGrid from './MemberGrid';

// Style color palette
const theme = createTheme({
  palette: {
    primary: {
      light: '#FFD6B1', // Light Orange
      main: '#FF6200', // Orange
      dark: '#AA3909', // Dark Orange
    },
    secondary: {
      // Lightest Grey: #FAF6F3
      light: '#EDE6E2', // Light Grey
      main: '#8B817C', // Grey
      dark: '#5A534F', // Dark Grey
    },
    text: {
      primary: '#5A534F', // Dark Grey
    },
  },
});

export default function AllGrid() {
  const isAssessor = true;

  return (
    <div style={{ width: '90%' }}>
      <strong>Example Grid</strong>
      <ExampleGrid theme={theme} />
      <strong>Team Grid</strong>
      <TeamGrid theme={theme} isAssessor={isAssessor} />
      <strong>Assessor Grid</strong>
      <MemberGrid theme={theme} isAssessor={isAssessor} forAssessors />
      <strong>Member Grid</strong>
      <MemberGrid theme={theme} isAssessor={isAssessor} forAssessors={false} />
    </div>
  );
}
