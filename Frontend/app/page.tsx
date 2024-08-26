"use client";

import Event from "./components/AllEvent/AllEvent";
import HomepageLayout from "./components/HomepageLayout/HomepageLayout";

export default function Home() {
  return (
    <HomepageLayout header="Upcoming Events">
      <Event />
    </HomepageLayout>
  );
}
