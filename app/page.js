'use client'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Education from '../components/sections/Education'
import WorkExperience from '../components/sections/WorkExperience'
import Projects from '../components/sections/Projects'
import Community from '../components/sections/Community'
import LifeFeed from '../components/sections/LifeFeed'
import Blog from '../components/sections/Blog'
import Guestbook from '../components/sections/Guestbook'
import Contact from '../components/sections/Contact'
import Divider from '../components/Divider'

export default function Home() {
  return (
    <>
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Education />
      <Divider />
      <WorkExperience />
      <Divider />
      <Projects />
      <Divider />
      <Community />
      <Divider />
      <LifeFeed />
      <Divider />
      <Blog />
      <Divider />
      <Guestbook />
      <Divider />
      <Contact />
    </>
  )
}