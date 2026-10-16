"use client";

import { useState } from "react";
import { TuitionLead } from "./TuitionLead";
import { ProgrammeFinder } from "./ProgrammeFinder";
import { LearningDesk } from "./LearningDesk";

export function TuitionJourney() {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <TuitionLead
        learningDesk={
          <LearningDesk programme={selected} onSelect={setSelected} />
        }
      />
      <ProgrammeFinder selected={selected} onSelect={setSelected} />
    </>
  );
}
