import { Client } from '@notionhq/client';

// Initialize the Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const safeExtract = (value, fallback = '') => {
  const result = extractPlainText(value || []);
  return result || fallback;
};

// Helper function to extract plain text from Notion rich text
function extractPlainText(richTextArray) {
  if (!richTextArray || !Array.isArray(richTextArray)) return '';
  return richTextArray.map(item => item.plain_text || '').join('');
}

// Helper function to convert Notion page properties for members/chapters
function formatMemberData(page) {
  const properties = page.properties;
  return {
    name: safeExtract(properties.name?.title),
    title: properties.title?.select?.name,
    image: {
      url: properties.image?.url || ''
    },
    linkedIn: properties.linkedIn?.url || properties.linkedin?.url || '',
    classOf: properties.class?.select?.name || '',
    urlSlug: safeExtract(properties.urlSlug?.rich_text || properties.url_slug?.rich_text || []) ||
             safeExtract(properties.name?.title || properties.Name?.title || []).toLowerCase().replace(/\s+/g, '-'),
    status: properties.status?.status?.name || '',
    email: properties.email?.email || '',
    joined: properties.joined?.select?.name || '',
    bio: safeExtract(properties.bio?.rich_text || [])
  };
}

function formatProjectData(page) {
  const properties = page.properties;
  
  return {
    title: safeExtract(properties.name?.title),
    team: properties.team?.people?.map(person => person.name || person.id).join(', ') || '',
    description: safeExtract(properties.description?.rich_text || []),
    thumbnail: {
      url: properties.thumbnail?.url || '',
      description: safeExtract(properties.thumbnailDescription?.rich_text) || ''
    },
    urlSlug: safeExtract(properties.urlSlug?.rich_text) || 
             safeExtract(properties.name?.title).toLowerCase().replace(/\s+/g, '-') || '',
    completedIn: properties.semester?.select?.name || 'Unknown'
  };
}

function formatRichTextForContentBlock(richTextArray) {
  if (!richTextArray || !Array.isArray(richTextArray)) return '';
  
  return safeExtract(richTextArray);
}

// Helper function to parse comma-separated feature data
function parseFeatureCollection(featureImagesText, featureDescriptionsText) {
  if (!featureImagesText) return [];
  
  const imageUrls = featureImagesText.split(',').map(url => url.trim()).filter(url => url);
  const descriptions = featureDescriptionsText ? 
    featureDescriptionsText.split(',').map(desc => desc.trim()) : [];
  
  return imageUrls.map((url, index) => ({
    header: `Feature ${index + 1}`,
    image: {
      url: url,
      description: descriptions[index] || `Feature ${index + 1} screenshot`
    },
    body: {
      json: descriptions[index] || `Description for feature ${index + 1}`
    }
  }));
}

export async function fetchProjectDetail(urlSlug) {
  try {
    const projectResponse = await notion.databases.query({
      database_id: process.env.NOTION_PROJECTS_DATABASE_ID,
      filter: {
        property: 'urlSlug',
        rich_text: {
          equals: urlSlug
        }
      }
    });
    
    if (!projectResponse.results.length) {
      return null;
    }

    const projectData = projectResponse.results[0];
    const properties = projectData.properties;

    const formattedProject = {
      title: safeExtract(properties.title?.title || properties.name?.title || []),
      description: safeExtract(properties.description?.rich_text || []),
      thumbnail: {
        url: properties.thumbnail?.url || properties.thumbnail?.files?.[0]?.file?.url || '',
        description: safeExtract(properties.thumbnail_description?.rich_text || [])
      },
      finalProductLink: properties.final_product_link?.url || '',
      codeRepoLink: properties.code_repo_link?.url || '',
      technologiesUsed: properties.technologies_used?.multi_select?.map(tech => tech.name).join(', ') || '',
      project: formatRichTextForContentBlock(properties.about_project?.rich_text || []),
      client: formatRichTextForContentBlock(properties.client?.rich_text || [{ plain_text: properties.client?.url || '' }]),
      impact: formatRichTextForContentBlock(properties.impact?.rich_text),
      featuresCollection: {
        items: parseFeatureCollection(
          safeExtract(properties.feature_images?.rich_text || []),
          safeExtract(properties.feature_descriptions?.rich_text || [])
        )
      },
      testimonialsCollection: {
        items: [] 
      },
      teamMembersCollection: {
        items: properties.team?.people?.map(person => ({
          name: person.name || 'Team Member',
          image: { url: person.avatar_url || '' },
        })) || []
      }
    };

    return formattedProject;
  } catch (error) {
    console.error('Error fetching project detail:', error);
    return null;
  }
}

export async function fetchMemberDetail(urlSlug) {
  try {
    const memberResponse = await notion.databases.query({
      database_id: process.env.NOTION_MEMBERS_DATABASE_ID,
      filter: {
        property: 'urlSlug',
        rich_text: {
          equals: urlSlug
        }
      }
    });
    
    if (!memberResponse.results.length) {
      return null;
    }

    const memberData = memberResponse.results[0];
    const properties = memberData.properties;
    
    // Format the data for the member detail page
    const formattedMember = {
      name: safeExtract(properties.name?.title || []),
      title: properties.title?.select?.name || '',
      image: {
        url: properties.image?.url || '',
        description: safeExtract(properties.name?.title || []) + ' profile photo'
      },
      linkedIn: properties.linkedin?.url || '',
      bio: safeExtract(properties.bio?.rich_text || []),
      classOf: properties.class?.select?.name || '',
      email: properties.email?.email || '',
      github: properties.github?.url || ''
    };

    return formattedMember;
  } catch (error) {
    console.error('Error fetching member detail:', error);
    return null;
  }
}

// Main fetch function that replaces the Contentful GraphQL queries
export async function fetchNotionContent(type, options = {}) {
  try {
    switch (type) {
      case 'members':
        const memberResponse = await notion.databases.query({
          database_id: process.env.NOTION_MEMBERS_DATABASE_ID,
          page_size: options.limit || 100,
        });
        return {
          memberCollection: {
            items: memberResponse.results.map(formatMemberData)
          }
        };

      case 'projects':
        const projectResponse = await notion.databases.query({
          database_id: process.env.NOTION_PROJECTS_DATABASE_ID,
          sort: {
            property: 'completion',
            direction: 'descending',
          }
        });

        return {
          pennWebsiteLayout: {
            projectsCollection: {
              items: projectResponse.results.map(formatProjectData)
            }
          }
        };

      case 'homepage':
        // Fetch both chapters and projects for homepage
        const [chaptersData, projectsData] = await Promise.all([
          fetchNotionContent('members'),
          fetchNotionContent('projects')
        ]);
        return {
          chapterCollection: chaptersData.memberCollection,
          pennWebsiteLayout: projectsData.pennWebsiteLayout
        };

      default:
        throw new Error(`Unknown content type: ${type}`);
    }
  } catch (error) {
    console.error(`There was a problem retrieving content for type ${type}:`, error);
    throw error;
  }
}

// Legacy function for backward compatibility
export async function fetchContent(query) {
  try {
    const res = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${space}/environments/master`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query }),
      },
    );
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error(`There was a problem retrieving entries with the query ${query}`);
    console.error(error);
  }
}

export default fetchNotionContent;
