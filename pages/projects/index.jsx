/* eslint-disable prettier/prettier */
import React from 'react';
import Head from '../../components/head';
import GradientBanner from '../../components/gradientBanner';
import ProjectList from '../../components/projects/projectList';
import fetchNotionContent from '../../utils/fetchContent';
import ActionButton from '../../components/actionButton';

function Projects({ projects }) {
  return (
    <div>
      <Head title="Our Work" />
      <GradientBanner
        arrow
        title="Our Work"
        subHeadline="In today&#39;s world, we are capable of changing the lives of those
                halfway across the country. While tech has enabled us to have a
                larger reach, we also understand that we have a responsibility
                to build tools that are more than just pet projects. We strive
                to deliver incredible value to the nonprofits we are fortunate
                enough to work with and look forward to seeing our products
                continue to be used for years to come. ">
        <ActionButton link="https://github.com/hack4impact-upenn">See our GitHub</ActionButton>
      </GradientBanner>
      <ProjectList projects={projects} />
    </div>
  );
}

export default Projects;

export async function getStaticProps() {
  try {
    const {
      pennWebsiteLayout: { projectsCollection },
    } = await fetchNotionContent('projects');

    return {
      props: {
        projects: projectsCollection.items,
      },
    };
  } catch (error) {
    console.error('Error fetching projects from Notion:', error);
    return {
      props: {
        projects: [],
      },
    };
  }
} 