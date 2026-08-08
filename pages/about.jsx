import React from 'react';
import GradientBanner from '../components/gradientBanner';
import MissionSection from '../components/about/missionSection';
import OurValues from '../components/about/ourValues';
import Head from '../components/head';
import Team from '../components/about/team';
import fetchNotionContent from '../utils/fetchContent';

function AboutPage({ members, alumni, execBoard }) {
  return (
    <div>
      <Head title="About Us" />
      <GradientBanner
        title="We believe in using tech for good."
        subHeadline="Hack4Impact believes in technology's huge potential to empower activists and humanitarians to create lasting and impactful social change. We work to foster the wider adoption of software as a tool for social good."
        arrow
      />
      <MissionSection />
      <OurValues />
      <Team members={members} alumni={alumni} execBoard={execBoard} />
    </div>
  );
}

export default AboutPage;

export async function getStaticProps() {
  let members = [];
  let alumni = [];
  let execBoard = [];
  try {
    const { memberCollection } = await fetchNotionContent('members');
    const membersList = memberCollection.items;
    members = membersList.filter(member => member.status === 'Active');
    alumni = membersList.filter(member => member.status === 'Alumni');
    execBoard = membersList.filter(member => member.title === 'Co-Director' || /chair/i.test(member.title));
  } catch (error) {
    console.error('Error fetching Notion members:', error);
  }

  return {
    props: {
      members,
      alumni,
      execBoard
    },
  };
}
