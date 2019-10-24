export const colors = {
  oldRose : "#C2847A",
  khaki: "#C9B79C",
  lightFrenchBeige: "#D0B17A",
  oldSilver: "#848586",
  smoke: "#71816D"
};

export const breakpoints = ["320px", "768px", "1024px", "1274px"];

export const space = [
  "0",
  "2px",
  "4px",
  "8px",
  "16px",
  "24px",
  "32px",
  "48px",
  "64px",
  "96px",
  "128px",
  "256px"
]

export const globalStyles = `
  html,
  body,
  #root {
    min-width: ${breakpoints[0]};
    min-height: 100vh;

    border: 0;
    margin: 0;
    padding: 0;

    background: ${colors.white};

    *{
      box-sizing: border-box;
      font-family: 'Be Vietnam', sans-serif
    }
  }
`;

export default {
  colors
};