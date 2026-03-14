import Hero           from '../components/sections/Hero'
import About          from '../components/sections/About'
import Education      from '../components/sections/Education'
import WorkExperience from '../components/sections/WorkExperience'
import Projects       from '../components/sections/Projects'
import Community      from '../components/sections/Community'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Education />
      <WorkExperience />
      <Projects />
      <Community />
    </>
  )
}
