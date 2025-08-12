import React from 'react';
import GradientBanner from '../components/gradientBanner';
import MissionSection from '../components/about/missionSection';
import OurValues from '../components/about/ourValues';
import Head from '../components/head';
import Team from '../components/about/team';
import { fetchContent } from '../utils/fetchContent';
import fetchNotionContent from '../utils/fetchContent';

function AboutPage({ members, alumni, values, execBoard }) {
  return (
    <div>
      <Head title="About Us" />
      <GradientBanner
        title="We believe in using tech for good."
        subHeadline="Hack4Impact believes in technology's huge potential to empower activists and humanitarians to create lasting and impactful social change. We work to foster the wider adoption of software as a tool for social good."
        arrow
      />
      <MissionSection />
      <OurValues content={values} />
      <Team members={members} alumni={alumni} execBoard={execBoard} />
    </div>
  );
}

export default AboutPage;

export async function getStaticProps() {
  try {
    // Fetch values from Contentful and all members from Notion
    const [contentfulData, allMembers] = await Promise.all([
      fetchContent(`
      {
        pennWebsiteLayout(id: "${process.env.LAYOUT_ENTRY_ID}") {
          chapterValuesCollection {
            items {
              header
              body {
                json
              }
              image {
                url
                description
              }
            }
          }
        }
      }
      `),
      fetchNotionContent('members')
    ]);

    const membersList = allMembers.memberCollection.items;
    const activeMembers = membersList.filter(member => member.status === 'Active');
    const alumni = membersList.filter(member => member.status === 'Alumni');
    const execBoard = membersList.filter(member => member.title === 'Co-Director' || /chair/i.test(member.title));


    return {
      props: {
        values: contentfulData.pennWebsiteLayout.chapterValuesCollection.items,
        members: activeMembers,
        alumni: alumni,
        execBoard: execBoard
      },
    };
  } catch (error) {
    console.error('Error fetching about page data:', error);
    return {
      props: {
        members: [],
        alumni: [],
        values: [],
        execBoard: []
      },
    };
  }
}
