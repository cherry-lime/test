import { createTheme } from '@mui/material/styles';

import ExampleGrid from './ExampleGrid';
import TeamGrid from './TeamGrid';
import AssessorGrid from './AssessorGrid';

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
      <AssessorGrid theme={theme} isAssessor={isAssessor} />
    </div>
  );
}
