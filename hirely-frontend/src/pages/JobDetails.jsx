// src/pages/JobDetails.jsx

import { useParams, Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock3 } from 'lucide-react';

const jobs = {
  1: {
    title: 'Senior Frontend Engineer',
    company: 'TechFlow Systems',
    location: 'San Francisco, CA (Hybrid)',
    salary: '$140k - $180k',
    type: 'Full-time',
    experience: '5+ Years',
    applicants: '42 Applicants',
    posted: '2 days ago',
    description:
      'We are seeking a highly skilled Frontend Engineer to architect and build scalable React applications used by millions of users globally.',
    responsibilities: [
      'Build scalable frontend architectures using React and TypeScript',
      'Collaborate with UI/UX designers',
      'Optimize performance and accessibility',
      'Write reusable component libraries',
      'Mentor junior developers',
    ],
    requirements: [
      '5+ years React experience',
      'Strong TypeScript knowledge',
      'TailwindCSS expertise',
      'REST & GraphQL experience',
      'Testing experience with Jest',
    ],
  },

  2: {
    title: 'Product Designer',
    company: 'Creative Pulse',
    location: 'Remote',
    salary: '$90k - $120k',
    type: 'Contract',
    experience: '3+ Years',
    applicants: '20 Applicants',
    posted: '5 hours ago',
    description:
      'Join our creative team to design modern digital experiences for startups and enterprise clients.',
    responsibilities: [
      'Create wireframes and prototypes',
      'Design modern interfaces',
      'Collaborate with developers',
      'Maintain design systems',
    ],
    requirements: [
      'Figma expertise',
      'Strong UX thinking',
      'Portfolio required',
      'Design system experience',
    ],
  },

  3: {
    title: 'Junior Backend Developer',
    company: 'DataStream AI',
    location: 'Austin, TX',
    salary: '$90k - $115k',
    type: 'Full-time',
    experience: '1-2 Years',
    applicants: '18 Applicants',
    posted: '1 day ago',
    description:
      'Work on scalable APIs and cloud infrastructure powering AI applications.',
    responsibilities: [
      'Build backend APIs',
      'Work with PostgreSQL',
      'Deploy cloud services',
      'Collaborate with frontend engineers',
    ],
    requirements: [
      'Node.js experience',
      'SQL knowledge',
      'AWS basics',
      'Git proficiency',
    ],
  },

  4: {
    title: 'Marketing Coordinator',
    company: 'GreenSphere',
    location: 'Portland, OR',
    salary: '$45k - $55k',
    type: 'Part-time',
    experience: '2+ Years',
    applicants: '11 Applicants',
    posted: '2 days ago',
    description:
      'Coordinate campaigns and help grow brand awareness through digital marketing strategies.',
    responsibilities: [
      'Manage social campaigns',
      'Coordinate events',
      'SEO optimization',
      'Analytics reporting',
    ],
    requirements: [
      'SEO experience',
      'Excellent communication',
      'Content strategy knowledge',
    ],
  },

  5: {
    title: 'Security Analyst',
    company: 'ShieldCorp',
    location: 'New York, NY',
    salary: '$120k - $150k',
    type: 'Full-time',
    experience: '4+ Years',
    applicants: '28 Applicants',
    posted: '3 days ago',
    description:
      'Protect enterprise systems from cyber threats and ensure security compliance.',
    responsibilities: [
      'Monitor threats',
      'Run penetration tests',
      'Implement security policies',
      'Respond to incidents',
    ],
    requirements: [
      'Cybersecurity experience',
      'Python scripting',
      'Security certifications preferred',
    ],
  },

  6: {
    title: 'Mobile App Developer',
    company: 'Swiftly',
    location: 'Remote',
    salary: '$130k - $165k',
    type: 'Full-time',
    experience: '4+ Years',
    applicants: '31 Applicants',
    posted: '4 days ago',
    description:
      'Build high-performance mobile apps for iOS and Android platforms.',
    responsibilities: [
      'Develop native mobile apps',
      'Integrate APIs',
      'Optimize app performance',
      'Collaborate with product teams',
    ],
    requirements: [
      'Swift or Kotlin expertise',
      'Firebase experience',
      'App Store deployment knowledge',
    ],
  },
};

export function JobDetails() {
  const { id } = useParams();

  const job = jobs[id];

  if (!job) {
    return <h1>Job not found</h1>;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FAF7F2',
        padding: '2rem',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <Link
        to="/dashboard"
        style={{
          textDecoration: 'none',
          color: '#D3A376',
          fontWeight: 600,
        }}
      >
        ← Back to Jobs
      </Link>

      <div
        style={{
          marginTop: '2rem',
          background: '#fff',
          borderRadius: 24,
          padding: '2rem',
          border: '1px solid #F1E7DB',
          maxWidth: 1000,
        }}
      >
        <h1
          style={{
            marginBottom: 10,
            color: '#2D2A26',
          }}
        >
          {job.title}
        </h1>

        <p
          style={{
            color: '#8C6E63',
            marginBottom: '1.5rem',
          }}
        >
          {job.company}
        </p>

        <div
          style={{
            display: 'flex',
            gap: 20,
            flexWrap: 'wrap',
            marginBottom: '2rem',
            color: '#8C6E63',
          }}
        >
          <div style={{ display: 'flex', gap: 6 }}>
            <MapPin size={18} />
            {job.location}
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            <Briefcase size={18} />
            {job.type}
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            <Clock3 size={18} />
            {job.posted}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 18,
            marginBottom: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <StatCard title="Salary" value={job.salary} />
          <StatCard title="Experience" value={job.experience} />
          <StatCard title="Applicants" value={job.applicants} />
        </div>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={sectionTitle}>About the Role</h2>

          <p
            style={{
              color: '#5B4636',
              lineHeight: 1.8,
            }}
          >
            {job.description}
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={sectionTitle}>Responsibilities</h2>

          <ul style={listStyle}>
            {job.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={sectionTitle}>Requirements</h2>

          <ul style={listStyle}>
            {job.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <button
          style={{
            background: '#D3A376',
            color: '#fff',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: 14,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: '#F6EFE7',
        padding: '1rem 1.5rem',
        borderRadius: 18,
        minWidth: 180,
      }}
    >
      <p
        style={{
          margin: 0,
          color: '#8C6E63',
          fontSize: 14,
        }}
      >
        {title}
      </p>

      <h3
        style={{
          marginTop: 8,
          color: '#2D2A26',
        }}
      >
        {value}
      </h3>
    </div>
  );
}

const sectionTitle = {
  color: '#2D2A26',
  marginBottom: '1rem',
};

const listStyle = {
  color: '#5B4636',
  lineHeight: 2,
};