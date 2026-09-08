import { VFSDirectory } from '../../types/vfs';
import { profileData } from '../../content/profile';
import { projectsData } from '../../content/projects';
import { skillsData } from '../../content/skills';
import { experienceData } from '../../content/experience';
import { systemConfig } from '../../content/config';

export function createInitialVFS(): VFSDirectory {
  // Generate dynamic project directories matching POSIX layout
  const projectDirectories: Record<string, any> = {};
  projectsData.forEach((p) => {
    projectDirectories[p.slug] = {
      name: p.slug,
      type: 'directory',
      permissions: 'drwxr-xr-x',
      children: {
        'README.md': {
          name: 'README.md',
          type: 'file',
          extension: 'md',
          permissions: '-rw-r--r--',
          sizeBytes: 2400,
          content: `# ${p.title}
Status: ${p.status.toUpperCase()} | Category: ${p.category} | Stars: ${p.stars ?? 0}
Tagline: ${p.tagline}

## 1. WHAT IT IS
${p.what}

## 2. WHY IT WAS BUILT
${p.why}

## 3. HOW IT WORKS
${p.how}

## 4. PROBLEM & SOLUTION
### The Problem:
${p.problem}

### The Solution:
${p.solution}

## 5. ARCHITECTURE OVERVIEW
${p.architecture.overview}

\`\`\`
${p.architecture.diagramAscii || ''}
\`\`\`

### Key Architectural Decisions:
${p.architecture.keyDecisions.map((d) => `- ${d}`).join('\n')}

## 6. CORE FEATURES
${p.features.map((f) => `- ${f}`).join('\n')}

## 7. ENGINEERING CHALLENGES & RESOLUTIONS
${p.challenges
  .map(
    (c, i) => `### Challenge ${i + 1}: ${c.challenge}
**Resolution:** ${c.resolution}`
  )
  .join('\n\n')}

## 8. KEY LEARNINGS
${p.learnings.map((l) => `- ${l}`).join('\n')}

## 9. PRODUCTION METRICS & IMPACT
${p.metrics.map((m) => `* ${m}`).join('\n')}

## 10. TECH STACK
- Core: ${p.techStack.core.join(', ')}
- Infrastructure: ${p.techStack.infrastructure.join(', ')}
- Databases: ${p.techStack.databases.join(', ')}
- Tools: ${p.techStack.tools.join(', ')}

Links:
- GitHub: ${p.links.github || 'N/A'}
- Live Demo: ${p.links.liveDemo || 'N/A'}
- Docs: ${p.links.docs || 'N/A'}
`
        },
        'stack.json': {
          name: 'stack.json',
          type: 'file',
          extension: 'json',
          permissions: '-rw-r--r--',
          sizeBytes: JSON.stringify(p.techStack).length,
          content: JSON.stringify(p.techStack, null, 2)
        },
        'metrics.json': {
          name: 'metrics.json',
          type: 'file',
          extension: 'json',
          permissions: '-rw-r--r--',
          sizeBytes: JSON.stringify(p.metrics).length,
          content: JSON.stringify(
            {
              project: p.name,
              metrics: p.metrics,
              status: p.status,
              stars: p.stars ?? 0
            },
            null,
            2
          )
        },
        'challenges.md': {
          name: 'challenges.md',
          type: 'file',
          extension: 'md',
          permissions: '-rw-r--r--',
          sizeBytes: 800,
          content: `# ${p.name} — Engineering Challenges

${p.challenges
  .map(
    (c, i) => `## ${i + 1}. ${c.challenge}
**Engineered Resolution:** ${c.resolution}`
  )
  .join('\n\n')}
`
        },
        architecture: {
          name: 'architecture',
          type: 'directory',
          permissions: 'drwxr-xr-x',
          children: {
            'system-design.md': {
              name: 'system-design.md',
              type: 'file',
              extension: 'md',
              permissions: '-rw-r--r--',
              sizeBytes: 950,
              content: `# ${p.name} — System Architecture\n\n${p.architecture.overview}\n\n## Data Flow Diagram:\n\`\`\`\n${p.architecture.diagramAscii || 'N/A'}\n\`\`\`\n\n## Key Architecture Decisions:\n${p.architecture.keyDecisions.map((d) => `- ${d}`).join('\n')}`
            },
            'trade-offs.md': {
              name: 'trade-offs.md',
              type: 'file',
              extension: 'md',
              permissions: '-rw-r--r--',
              sizeBytes: 600,
              content: `# Engineering Trade-Offs & Decisions\n\n${p.architecture.keyDecisions.map((d, i) => `### Decision ${i + 1}\n${d}`).join('\n\n')}`
            }
          }
        },
        features: {
          name: 'features',
          type: 'directory',
          permissions: 'drwxr-xr-x',
          children: {
            'specs.md': {
              name: 'specs.md',
              type: 'file',
              extension: 'md',
              permissions: '-rw-r--r--',
              sizeBytes: 650,
              content: `# ${p.name} Feature Specifications\n\n${p.features.map((f) => `- [x] ${f}`).join('\n')}`
            }
          }
        },
        screenshots: {
          name: 'screenshots',
          type: 'directory',
          permissions: 'drwxr-xr-x',
          children: {
            'manifest.json': {
              name: 'manifest.json',
              type: 'file',
              extension: 'json',
              permissions: '-rw-r--r--',
              sizeBytes: 150,
              content: JSON.stringify(
                {
                  project: p.slug,
                  images: p.images || [
                    { caption: `${p.name} Architecture Overview`, url: '/assets/architecture.png' }
                  ]
                },
                null,
                2
              )
            }
          }
        }
      }
    };
  });

  // Generate dynamic skills files
  // Generate dynamic skills files and stack matrix
  const skillFiles: Record<string, any> = {
    'stack-matrix.md': {
      name: 'stack-matrix.md',
      type: 'file',
      extension: 'md',
      permissions: '-rw-r--r--',
      sizeBytes: 2800,
      content: `# SAKETH.OS Engineering Stack & Skill Diagnostic Matrix

${skillsData
  .map(
    (cat) => `## ${cat.category.toUpperCase()}
${cat.skills
  .map(
    (s) =>
      `- **${s.name.padEnd(20)}** ${s.asciiMeter} [${s.classification.toUpperCase()}] ${
        s.experienceYears ? `(${s.experienceYears} yrs)` : ''
      }\n  *Used For:* ${s.whatUsedFor}\n  *Concepts:* ${s.engineeringConcepts.join(', ')}`
  )
  .join('\n\n')}`
  )
  .join('\n\n---\n\n')}
`
    },
    'skills-graph.json': {
      name: 'skills-graph.json',
      type: 'file',
      extension: 'json',
      permissions: '-rw-r--r--',
      sizeBytes: JSON.stringify(skillsData).length,
      content: JSON.stringify(skillsData, null, 2)
    }
  };

  skillsData.forEach((s) => {
    const slug = s.slug || s.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    skillFiles[`${slug}.json`] = {
      name: `${slug}.json`,
      type: 'file',
      extension: 'json',
      permissions: '-rw-r--r--',
      sizeBytes: JSON.stringify(s).length,
      content: JSON.stringify(s, null, 2)
    };
  });

  // Generate experience files
  const experienceFiles: Record<string, any> = {};
  experienceData.forEach((e) => {
    experienceFiles[`${e.id}.md`] = {
      name: `${e.id}.md`,
      type: 'file',
      extension: 'md',
      permissions: '-rw-r--r--',
      sizeBytes: e.summary.length * 3,
      content: `# ${e.role} @ ${e.company}
Period: ${e.period.start} - ${e.period.end} (${e.type}) | Location: ${e.location}

## Summary
${e.summary}

## Key Achievements
${e.keyAchievements.map((a) => `- ${a}`).join('\n')}

## Impact Metrics
${e.impactMetrics.map((m) => `* ${m}`).join('\n')}

## Technologies
${e.technologies.join(', ')}
`
    };
  });

  const root: VFSDirectory = {
    name: '/',
    type: 'directory',
    permissions: 'drwxr-xr-x',
    children: {
      home: {
        name: 'home',
        type: 'directory',
        permissions: 'drwxr-xr-x',
        children: {
          saketh: {
            name: 'saketh',
            type: 'directory',
            permissions: 'drwx------',
            children: {
              'README.md': {
                name: 'README.md',
                type: 'file',
                extension: 'md',
                permissions: '-rw-r--r--',
                sizeBytes: 420,
                content: `# Welcome to SAKETH.OS (v${systemConfig.osVersion})

This is an interactive developer operating system and developer portfolio.

## Navigation & Quick Commands:
- \`help\`        : Display all available commands and options
- \`whoami\`      : Display developer profile and summary
- \`projects\`    : Explore engineering projects & architecture deep dives
- \`skills\`      : View technical proficiencies and tooling
- \`experience\`  : Career history, impact metrics, and leadership
- \`contact\`     : Interactive contact dispatch form & links
- \`neofetch\`    : System telemetry and machine specs
- \`ls\`, \`cd\`     : Navigate virtual POSIX filesystem

Pro-tip: Use [Tab] for autocomplete and [Up/Down] for command history.
`
              },
              'about.md': {
                name: 'about.md',
                type: 'file',
                extension: 'md',
                permissions: '-rw-r--r--',
                sizeBytes: 1280,
                content: `# ${profileData.name} — Engineering Profile
Headline: ${profileData.headline}
Location: ${profileData.location}
Status: ${profileData.status}

## 1. Developer Roles
${profileData.roles.map((r) => `- ${r}`).join('\n')}

## 2. Education
${profileData.education
  .map(
    (e) => `### ${e.degree}
Institution: ${e.institution} (${e.timeline})
Location: ${e.location}
Key Focus: ${e.focus.join(', ')}`
  )
  .join('\n\n')}

## 3. Engineering Interests
${profileData.engineeringInterests.map((interest) => `- ${interest}`).join('\n')}

## 4. Development Philosophy
${profileData.developmentPhilosophy
  .map((p) => `* **${p.title}**: ${p.description}`)
  .join('\n')}

## 5. Current Focus
${profileData.currentFocus.map((f) => `- ${f}`).join('\n')}

## 6. Long-Term Goals
${profileData.longTermGoals.map((g) => `- ${g}`).join('\n')}
`
              },
              'profile.json': {
                name: 'profile.json',
                type: 'file',
                extension: 'json',
                permissions: '-rw-r--r--',
                sizeBytes: JSON.stringify(profileData.profileJson).length,
                content: JSON.stringify(profileData.profileJson, null, 2)
              },
              'bio.txt': {
                name: 'bio.txt',
                type: 'file',
                extension: 'txt',
                permissions: '-rw-r--r--',
                sizeBytes: profileData.bio.join('\n').length,
                content: `${profileData.name} (${profileData.handle})
${profileData.headline}
Location: ${profileData.location}

${profileData.bio.join('\n\n')}
`
              },
              'contact.json': {
                name: 'contact.json',
                type: 'file',
                extension: 'json',
                permissions: '-rw-r--r--',
                sizeBytes: 256,
                content: JSON.stringify(
                  {
                    email: profileData.email,
                    github: profileData.github,
                    linkedin: profileData.linkedin,
                    twitter: profileData.twitter,
                    gpg: profileData.gpgKeyFingerprint
                  },
                  null,
                  2
                )
              },
              'gpg-key.asc': {
                name: 'gpg-key.asc',
                type: 'file',
                extension: 'asc',
                permissions: '-r--r--r--',
                sizeBytes: 120,
                content: `-----BEGIN PGP PUBLIC KEY BLOCK-----
Fingerprint: ${profileData.gpgKeyFingerprint}
User: ${profileData.name} <${profileData.email}>
[Simulated 4096-bit RSA Master Key]
-----END PGP PUBLIC KEY BLOCK-----`
              },
              '.bashrc': {
                name: '.bashrc',
                type: 'file',
                extension: 'sh',
                permissions: '-rw-r--r--',
                sizeBytes: 150,
                content: `export USER=saketh\nexport HOST=saketh-workstation\nexport SHELL=/bin/zsh\nalias ll="ls -la"\nalias cls="clear"`
              },
              projects: {
                name: 'projects',
                type: 'directory',
                permissions: 'drwxr-xr-x',
                children: projectDirectories
              },
              skills: {
                name: 'skills',
                type: 'directory',
                permissions: 'drwxr-xr-x',
                children: skillFiles
              },
              experience: {
                name: 'experience',
                type: 'directory',
                permissions: 'drwxr-xr-x',
                children: experienceFiles
              }
            }
          }
        }
      },
      etc: {
        name: 'etc',
        type: 'directory',
        permissions: 'drwxr-xr-x',
        children: {
          'os-release': {
            name: 'os-release',
            type: 'file',
            extension: 'conf',
            permissions: '-r--r--r--',
            sizeBytes: 180,
            content: `NAME="SAKETH.OS"\nVERSION="${systemConfig.osVersion}"\nID=sakethos\nPRETTY_NAME="SAKETH.OS Developer Workstation"\nKERNEL="${systemConfig.kernelVersion}"`
          },
          motd: {
            name: 'motd',
            type: 'file',
            extension: 'txt',
            permissions: '-r--r--r--',
            sizeBytes: 95,
            content: `Authorized access only. All terminal actions are recorded.\nType 'help' to get started.`
          }
        }
      },
      bin: {
        name: 'bin',
        type: 'directory',
        permissions: 'drwxr-xr-x',
        children: {
          zsh: {
            name: 'zsh',
            type: 'file',
            permissions: '-rwxr-xr-x',
            content: 'ELF 64-bit LSB executable, x86-64'
          },
          ls: {
            name: 'ls',
            type: 'file',
            permissions: '-rwxr-xr-x',
            content: 'ELF 64-bit LSB executable, x86-64'
          },
          cat: {
            name: 'cat',
            type: 'file',
            permissions: '-rwxr-xr-x',
            content: 'ELF 64-bit LSB executable, x86-64'
          }
        }
      }
    }
  };

  return root;
}
