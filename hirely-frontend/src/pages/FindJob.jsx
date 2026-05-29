import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Clock3,
  Briefcase,
  Bell,
  LogOut,
} from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'TechFlow Systems',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$140k - $180k',
    posted: '2 hours ago',
    tags: ['React', 'TypeScript', 'Tailwind'],
    badge: 'HOT',
    logo: '💻',
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'Creative Pulse',
    location: 'Remote',
    type: 'Contract',
    salary: '$90k - $120k',
    posted: '5 hours ago',
    tags: ['Figma', 'UI/UX', 'Design Systems'],
    logo: '🎨',
  },
  {
    id: 3,
    title: 'Junior Backend Developer',
    company: 'DataStream AI',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$90k - $115k',
    posted: '1 day ago',
    tags: ['Node.js', 'PostgreSQL', 'AWS'],
    badge: 'HOT',
    logo: '🧠',
  },
  {
    id: 4,
    title: 'Marketing Coordinator',
    company: 'GreenSphere',
    location: 'Portland, OR',
    type: 'Part-time',
    salary: '$45k - $55k',
    posted: '2 days ago',
    tags: ['SEO', 'Social Media', 'Events'],
    logo: '📈',
  },
  {
    id: 5,
    title: 'Security Analyst',
    company: 'ShieldCorp',
    location: 'New York, NY',
    type: 'Full-time',
    salary: '$120k - $150k',
    posted: '3 days ago',
    tags: ['Cybersecurity', 'Python'],
    logo: '🛡️',
  },
  {
    id: 6,
    title: 'Mobile App Developer',
    company: 'Swiftly',
    location: 'Remote',
    type: 'Full-time',
    salary: '$130k - $165k',
    posted: '4 days ago',
    tags: ['Swift', 'Kotlin', 'Firebase'],
    badge: 'HOT',
    logo: '📱',
  },
];

export function FindJob()  {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FAF7F2',
        display: 'flex',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: 250,
          background: '#fff',
          borderRight: '1px solid #F1E7DB',
          padding: '2rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h2
            style={{
              color: '#D3A376',
              marginBottom: '2rem',
              fontWeight: 700,
            }}
          >
            TalentBridge
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button style={menuStyle(true)}>
              <Search size={18} />
              Find Jobs
            </button>

            <button style={menuStyle(false)}>
              <Briefcase size={18} />
              Applications
            </button>

            <button style={menuStyle(false)}>
              <Bell size={18} />
              My Profile
            </button>
          </div>
        </div>

        <button style={logoutStyle}>
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: '2rem 3rem' }}>
        {/* TOP BAR */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: '2rem',
                color: '#2D2A26',
              }}
            >
              Good morning, Alex 👋
            </h1>

            <p
              style={{
                marginTop: 8,
                color: '#8C6E63',
              }}
            >
              We've found 152 new jobs matching your profile.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <Bell color="#8C6E63" />
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: '#D3A376',
                color: '#fff',
                display: 'grid',
                placeItems: 'center',
                fontWeight: 700,
              }}
            >
              A
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div
          style={{
            background: '#fff',
            padding: '1rem',
            borderRadius: 18,
            border: '1px solid #F1E7DB',
            display: 'flex',
            gap: 12,
            marginBottom: '2rem',
          }}
        >
          <input
            placeholder="Job title, keywords, or company..."
            style={inputStyle}
          />

          <input
            placeholder="Location or Remote"
            style={inputStyle}
          />

          <button style={searchButton}>
            Find Jobs
          </button>
        </div>

        {/* FILTERS */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            'Remote',
            'Full-time',
            'Internship',
            'Entry Level',
            'Design',
            'Engineering',
            'Marketing',
          ].map((filter) => (
            <div key={filter} style={filterStyle}>
              {filter}
            </div>
          ))}
        </div>

        {/* JOBS */}
        <h2
          style={{
            color: '#2D2A26',
            marginBottom: '1.5rem',
          }}
        >
          Recommended for you
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))',
            gap: '1.5rem',
          }}
        >
          {jobs.map((job) => (
            <div key={job.id} style={cardStyle}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 14,
                    background: '#F6EFE7',
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: '1.5rem',
                  }}
                >
                  {job.logo}
                </div>

                {job.badge && (
                  <div
                    style={{
                      background: '#FFE7D1',
                      color: '#FF7A00',
                      padding: '0.2rem 0.7rem',
                      borderRadius: 999,
                      fontSize: 12,
                      fontWeight: 700,
                      height: 'fit-content',
                    }}
                  >
                    {job.badge}
                  </div>
                )}
              </div>

              <h3
                style={{
                  marginTop: '1rem',
                  marginBottom: 4,
                  color: '#2D2A26',
                }}
              >
                {job.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: '#8C6E63',
                  fontSize: 14,
                }}
              >
                {job.company}
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: 14,
                  marginTop: '1rem',
                  color: '#8C6E63',
                  fontSize: 14,
                }}
              >
                <div style={{ display: 'flex', gap: 5 }}>
                  <MapPin size={15} />
                  {job.location}
                </div>

                <div style={{ display: 'flex', gap: 5 }}>
                  <Clock3 size={15} />
                  {job.posted}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  marginTop: '1rem',
                  flexWrap: 'wrap',
                }}
              >
                {job.tags.map((tag) => (
                  <div key={tag} style={tagStyle}>
                    {tag}
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '1.2rem',
                  alignItems: 'center',
                }}
              >
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      color: '#2D2A26',
                    }}
                  >
                    {job.salary}
                  </p>

                  <span
                    style={{
                      color: '#8C6E63',
                      fontSize: 14,
                    }}
                  >
                    {job.type}
                  </span>
                </div>

                <Link to={`/jobs/${job.id}`}>
                  <button style={detailsButton}>
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const menuStyle = (active) => ({
  background: active ? '#F6EFE7' : 'transparent',
  border: 'none',
  borderRadius: 12,
  padding: '0.9rem 1rem',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  cursor: 'pointer',
  color: active ? '#D3A376' : '#8C6E63',
  fontWeight: active ? 600 : 500,
});

const logoutStyle = {
  border: 'none',
  background: 'transparent',
  color: '#DC2626',
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  cursor: 'pointer',
  fontWeight: 600,
};

const inputStyle = {
  flex: 1,
  padding: '1rem',
  borderRadius: 12,
  border: '1px solid #E5D8C8',
  outline: 'none',
  fontSize: 14,
  background: '#fff',
};

const searchButton = {
  background: '#D3A376',
  color: '#fff',
  border: 'none',
  borderRadius: 12,
  padding: '0 1.5rem',
  cursor: 'pointer',
  fontWeight: 600,
};

const filterStyle = {
  padding: '0.5rem 1rem',
  background: '#fff',
  border: '1px solid #F1E7DB',
  borderRadius: 999,
  color: '#8C6E63',
  fontSize: 14,
};

const cardStyle = {
  background: '#fff',
  borderRadius: 20,
  padding: '1.5rem',
  border: '1px solid #F1E7DB',
};

const tagStyle = {
  background: '#F6EFE7',
  padding: '0.35rem 0.7rem',
  borderRadius: 999,
  fontSize: 12,
  color: '#8C6E63',
};

const detailsButton = {
  border: 'none',
  background: '#D3A376',
  color: '#fff',
  padding: '0.8rem 1.2rem',
  borderRadius: 10,
  cursor: 'pointer',
  fontWeight: 600,
};