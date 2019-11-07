export const colors = {
  oldRose : "#C2847A",
  khaki: "#C9B79C",
  darkKhaki: "#B09265",
  lightFrenchBeige: "#D0B17A",
  oldSilver: "#848586",
  smoke: "#71816D",
  white: "#FAFAFA",
  black: [
    "#000",
    "#121212",
    "#242424"
  ]
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
];

export const texts = {
  h2: {
    color: colors.black[0],
    fontSize: "28px",
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: "42px"
  },
  label: {
    color: colors.black[1],
    fontSize: "14px",
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: "18px",
    textAlign: "center"
  },
  menuButton: {
    color: colors.black[0],
    fontSize: "16px",
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: "25px",
    cursor: "pointer",
    textAlign: "center",
    padding: space[4]
  },
  common: {
    color: colors.black[2],
    fontSize: "12px",
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: "16px"
  }
};

export const headers = {
  primary: {
    height: "60px",
    borderBottom: '1px solid #ddd',
    backgroundColor: colors.khaki,
    flexWrap: 'nowrap',
    justifyContent: "space-between"
  }
};

export const images = {
  profile : {
    height: "150px",
    width: "150px",
    display: "block",
    overflow: "hidden",
    borderRadius: "50%"
  },
  thumbnail: {
    height: `calc(${headers.primary.height} - ${space[4]})`,
    width: `calc(${headers.primary.height} - ${space[4]})`,
    display: "block",
    overflow: 'hidden',
    borderRadius: "50%"
  }
};

export const linkStyles = {
  menuLink : {
    a: {
      color: colors.black[0],
      width: "100%",
      height: `calc(${space[4]} + ${space[4]} + ${texts.menuButton.lineHeight})`
      
    },
    ":hover": {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      color: colors.white
    },
    "a:visited": {
      color: colors.black[0]
    }
  },
  common : texts.common
};

export const fields = {
  primary : {
    backgroundColor: colors.white
  }
};

export const profilePicture = {
  width: "274px",
  height: "187px"
};

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
  colors,
  breakpoints,
  space,
  texts,
  headers,
  linkStyles,
  profilePicture,
  images,
};