"use client";
import { MilestoneTable } from "./Milestonetable";
import { Milestone } from "@/types/milestone";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const sampleMilestones: Milestone[] = [
  {
    id: "m1",
    name: "Project Kickoff",
    createdDate: new Date("2025-01-05"),
    completedDate: new Date("2025-01-10"),
    numTasks: 5,
    description:
      "Initial project setup including repository creation and team onboarding.",
  },
  {
    id: "m2",
    name: "UI Wireframes",
    createdDate: new Date("2025-01-12"),
    completedDate: new Date("2025-01-20"),
    numTasks: 8,
    description:
      "Design wireframes for all major pages and review with stakeholders.",
  },
  {
    id: "m3",
    name: "Backend API Setup",
    createdDate: new Date("2025-01-22"),
    completedDate: new Date("2025-02-05"),
    numTasks: 10,
    description:
      "Setup Django backend with REST API endpoints for user and data management.",
  },
  {
    id: "m4",
    name: "Database Integration",
    createdDate: new Date("2025-02-06"),
    completedDate: new Date("2025-02-12"),
    numTasks: 6,
    description:
      "Integrate PostgreSQL database and connect ORM models with migrations.",
  },
  {
    id: "m5",
    name: "Authentication System",
    createdDate: new Date("2025-02-15"),
    completedDate: new Date("2025-02-28"),
    numTasks: 7,
    description:
      "Implement JWT authentication and user roles with frontend integration.",
  },
  {
    id: "m6",
    name: "Frontend Dashboard",
    createdDate: new Date("2025-03-01"),
    completedDate: new Date("2025-03-18"),
    numTasks: 12,
    description:
      "Develop React-based admin dashboard with charts and analytics panels.",
  },
  {
    id: "m7",
    name: "Testing & QA",
    createdDate: new Date("2025-03-20"),
    completedDate: new Date("2025-04-05"),
    numTasks: 9,
    description:
      "Conduct unit, integration, and end-to-end testing across all modules.",
  },
  {
    id: "m8",
    name: "Beta Deployment",
    createdDate: new Date("2025-04-10"),
    completedDate: new Date("2025-04-20"),
    numTasks: 4,
    description:
      "Deploy the beta version to staging servers for internal review.",
  },
  {
    id: "m9",
    name: "User Feedback Round",
    createdDate: new Date("2025-04-22"),
    completedDate: null,
    numTasks: 5,
    description:
      "Collect and analyze user feedback from beta testers and prepare improvements.",
  },
  {
    id: "m10",
    name: "Production Launch",
    createdDate: new Date("2025-05-01"),
    completedDate: null,
    numTasks: 3,
    description:
      "Finalize and deploy the first public release of the platform.",
  },
];

export default function Page() {
  return (
    <section className="flex flex-col gap-10 ">
      <h1 className="text-center font-medium text-2xl mt-5">Health</h1>
      <div className=" bg-gray-100 h-[100px] max-h-[100px] overflow-hidden w-full rounded-md p-5 text-sm text-gray-800">
        A description about the path
      </div>

      <div className="text-sm text-gray-800 flex flex-col gap-5">
        <h2 className="font-normal text-xl mt-5">Milestones</h2>
        <div className="flex flex-col gap-5 rounded-md bg-gray-100 p-5">
          <MilestoneTable data={sampleMilestones}></MilestoneTable>
        </div>
      </div>

      <div className="text-sm text-gray-800 flex flex-col gap-5">
        <h2 className="font-normal text-xl mt-5">Key Result Areas</h2>
        <div className="bg-gray-100 p-5">
          <KRA />
        </div>
      </div>

      <div className="text-sm text-gray-800 flex flex-col gap-5">
        <h2 className="font-normal text-xl mt-5">Key Constraints</h2>
        <div className="bg-gray-100 p-5">
          <KC />
        </div>
      </div>
    </section>
  );
}

export function KRA() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Shipping Details</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We offer worldwide shipping through trusted courier partners.
            Standard delivery takes 3-5 business days, while express shipping
            ensures delivery within 1-2 business days.
          </p>
          <p>
            All orders are carefully packaged and fully insured. Track your
            shipment in real-time through our dedicated tracking portal.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Return Policy</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We stand behind our products with a comprehensive 30-day return
            policy. If you&apos;re not completely satisfied, simply return the
            item in its original condition.
          </p>
          <p>
            Our hassle-free return process includes free return shipping and
            full refunds processed within 48 hours of receiving the returned
            item.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function KC() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Product Information</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            Our flagship product combines cutting-edge technology with sleek
            design. Built with premium materials, it offers unparalleled
            performance and reliability.
          </p>
          <p>
            Key features include advanced processing capabilities, and an
            intuitive user interface designed for both beginners and experts.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Shipping Details</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We offer worldwide shipping through trusted courier partners.
            Standard delivery takes 3-5 business days, while express shipping
            ensures delivery within 1-2 business days.
          </p>
          <p>
            All orders are carefully packaged and fully insured. Track your
            shipment in real-time through our dedicated tracking portal.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Return Policy</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p>
            We stand behind our products with a comprehensive 30-day return
            policy. If you&apos;re not completely satisfied, simply return the
            item in its original condition.
          </p>
          <p>
            Our hassle-free return process includes free return shipping and
            full refunds processed within 48 hours of receiving the returned
            item.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
