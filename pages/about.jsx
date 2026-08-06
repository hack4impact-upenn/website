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
  // Fetch values from Contentful and all members from Notion independently,
  // so a failure in one CMS doesn't wipe out data from the other.
  const [contentfulResult, notionResult] = await Promise.allSettled([
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

  let values = [];
  if (contentfulResult.status === 'fulfilled') {
    values = contentfulResult.value?.pennWebsiteLayout?.chapterValuesCollection?.items ?? [];
  } else {
    console.error('Error fetching Contentful values:', contentfulResult.reason);
  }

  let members = [];
  let alumni = [];
  let execBoard = [];
  if (notionResult.status === 'fulfilled') {
    const membersList = notionResult.value.memberCollection.items;
    members = membersList.filter(member => member.status === 'Active');
    alumni = membersList.filter(member => member.status === 'Alumni');
    execBoard = membersList.filter(member => member.title === 'Co-Director' || /chair/i.test(member.title));
  } else {
    console.error('Error fetching Notion members:', notionResult.reason);
  }

  return {
    props: {
      values,
      members,
      alumni,
      execBoard
    },
    revalidate: 60,
  };
}
