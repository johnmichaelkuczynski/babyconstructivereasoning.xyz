// Aggregated Constructive Critical Reasoning curriculum content.
// Each section provides one lecture plus its homework authored in all three
// answer formats (15 MC / 9 hybrid / 5 written). The seed flattens these into
// topics, lectures, and one homework assignment per section.
import type { SectionContent } from "./types";
import { section as s1 } from "./s1";
import { section as s2 } from "./s2";
import { section as s3 } from "./s3";
import { section as s4 } from "./s4";
import { section as s5 } from "./s5";
import { section as s6 } from "./s6";
import { section as s7 } from "./s7";
import { section as s8 } from "./s8";

export const SECTIONS: SectionContent[] = [s1, s2, s3, s4, s5, s6, s7, s8];

export type { SectionContent, HomeworkItem, McOption, WrittenRubric } from "./types";
