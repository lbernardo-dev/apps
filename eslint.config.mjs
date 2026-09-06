import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "out_serve/**", "node_modules/**", "next-env.d.ts", "**/._*"]
  },
  ...nextVitals
];

export default eslintConfig;
