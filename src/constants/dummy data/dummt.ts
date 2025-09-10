// Static data for recent posts
import { StaticImageData } from "next/image";
import BlogImage from "../../app/assets/blog1.jpg";

export interface BlogPost {
  id: number;
  imageUrl: StaticImageData;
  title: string;
  author: string;
  date: string; // could be Date if you store it as an actual date
  slug: string;
}

export const STATIC_RECENT_POSTS: BlogPost[] = [
  {
    id: 101,
    imageUrl: BlogImage,
    title: "Ayushman Bharat in Assam: Check Eligibility Online",
    author: "Govind Ramchandra",
    date: "July 21, 2025",
    slug: "ayushman-bharat-assam-eligibility",
  },
  {
    id: 102,
    imageUrl: BlogImage,
    title: "Assam Tea Workers Welfare Schemes",
    author: "Govind Ramchandra",
    date: "July 21, 2025",
    slug: "assam-tea-workers-welfare",
  },
  {
    id: 103,
    imageUrl: BlogImage,
    title: "PMAY-Urban: New Scheme for City Dwellers in Assam",
    author: "Govind Ramchandra",
    date: "July 21, 2025",
    slug: "pmay-urban-assam-dwellers",
  },
  {
    id: 104,
    imageUrl: BlogImage,
    title: "Subsidy for Assam Dairy Farmers in 2025",
    author: "Govind Ramchandra",
    date: "July 21, 2025",
    slug: "subsidy-assam-dairy-farmers",
  },
  {
    id: 105,
    imageUrl: BlogImage,
    title: "Ujjwala Yojana in Assam: LPG for All",
    author: "Govind Ramchandra",
    date: "July 21, 2025",
    slug: "ujjwala-yojana-assam-lpg",
  },
];

export const schemes = [
  {
    name: "Assam Dairy Subsidy Scheme",
    deadline: "August 31, 2025",
  },
  {
    name: "Ayushman Bharat Assam",
    deadline: "September 15, 2025",
  },
  {
    name: "PMAY-Urban Assam",
    deadline: "October 30, 2025",
  },

  {
    name: "Assam Tea Workers Welfare",
    deadline: "November 20, 2025",
  },
  {
    name: "Ujjwala Yojana Assam",
    deadline: "December 31, 2025",
  },
  {
    name: "Track Your Scheme Application",
    deadline: "Ongoing",
  },
  {
    name: "Assam Housing Scheme for BPL Families",
    deadline: "Ongoing",
  },
];