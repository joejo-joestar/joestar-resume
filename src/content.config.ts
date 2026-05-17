import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const projectsSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  link: z.url().optional(),
  github: z.url().optional(),
  order: z.number().default(0),
});

const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  location: z.string().optional(),
  order: z.number().default(0),
});

const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  startYear: z.number(),
  endYear: z.number().optional(),
  gpa: z.string().optional(),
  order: z.number().default(0),
});

const skillsSchema = z.object({
  category: z.string(),
  group: z.string().default("Other"),
  items: z.array(z.string()),
  order: z.number().default(0),
});

export type ProjectData = z.infer<typeof projectsSchema>;
export type ExperienceData = z.infer<typeof experienceSchema>;
export type EducationData = z.infer<typeof educationSchema>;
export type SkillsData = z.infer<typeof skillsSchema>;

export const collections = {
  projects: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
    schema: projectsSchema,
  }),
  experience: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
    schema: experienceSchema,
  }),
  education: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/education" }),
    schema: educationSchema,
  }),
  skills: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/skills" }),
    schema: skillsSchema,
  }),
};
