import dynamic from "next/dynamic";
import React from "react"

const DynamicComponentWithNoSSR = dynamic(
  () => import('./game'),
  { ssr: false }
)

const HomePage = () => {
  return <DynamicComponentWithNoSSR />
};

export default HomePage;
