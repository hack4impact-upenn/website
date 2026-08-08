import React from 'react';
import Section from '../section';
import { Container, Row } from 'reactstrap';
import ActionLink from '../actionLink';

const TIER_ORDER = ['Platinum', 'Gold', 'Silver', 'Bronze'];

export default function PartnerSection({ partners }) {
  const tiers = TIER_ORDER.map((tier) => ({
    tier,
    partners: partners.filter((partner) => partner.tier === tier).sort((a, b) => a.order - b.order),
  })).filter(({ partners: tierPartners }) => tierPartners.length > 0);

  return (
    <Section className="partners-section">
      <Container>
        <h2 className="section-title center mb-5">Our Partners</h2>
        {tiers.map(({ tier, partners: tierPartners }) => (
          <div className="tier-row" key={tier}>
            <h3 className="tier-label">{tier}</h3>
            <div className="sponsor-row">
              {tierPartners.map(({ name, logoUrl, link }) => (
                <a href={link} key={name}>
                  <img width="150" src={logoUrl} className="partner-logos" alt={`${name} logo`} />
                </a>
              ))}
            </div>
          </div>
        ))}
        <Row>
          <div className="center partner-button">
            <ActionLink
              text="Interested in partnering? Contact us"
              link="mailto:penn@hack4impact.org"
            />
          </div>
        </Row>
      </Container>
      <style jsx>{`
        .partners-section h2 {
          font-size: 20px;
          text-align: center;
          margin-bottom: 50px;
          color: #373f46;
          opacity: 0.7;
          font-weight: 300;
        }
        .tier-row {
          margin-bottom: 30px;
        }
        .tier-label {
          text-align: center;
          font-size: 16px;
          font-weight: 600;
          color: #373f46;
          opacity: 0.7;
          margin-bottom: 15px;
        }
        .partner-button {
          margin-top: 30px !important;
        }
        .partner-logos {
          margin: 0;
          max-width: 15vw;
        }
        .sponsor-row {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
        }
      `}</style>
    </Section>
  );
}
