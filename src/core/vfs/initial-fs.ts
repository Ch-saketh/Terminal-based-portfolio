import { VFSDirectory } from '../../types/vfs';
import { profileData } from '../../content/profile';
import { projectsData } from '../../content/projects';
import { skillsData } from '../../content/skills';
import { experienceData } from '../../content/experience';
import { systemConfig } from '../../content/config';

export function createInitialVFS(): VFSDirectory {
  // Generate dynamic project files
  const projectFiles: Record<string, any> = {};
  projectsData.forEach(p => {
    projectFiles[`${p.slug}.md`] = {
      name: `${p.slug}.md`,
      type: 'file',
      extension: 'md',
      permissions: '-rw-r--r--',
      sizeBytes: p.description.length * 2,
      content: `# ${p.title}
Category: ${p.category}
Status: ${p.status} | Stars: ${p.stars ?? 0}

${p.tagline}

## Overview
${p.description}

## Key Highlights
${p.highlights.map(h => `- ${h}`).join('\n')}

## Architecture Decisions
${p.architecture.overview}
${p.architecture.keyDecisions.map(d => `* ${d}`).join('\n')}

## Metrics & Impact
${p.metrics.map(m => `* ${m}`).join('\n')}

## Tech Stack
Core: ${p.techStack.core.join(', ')}
Infrastructure: ${p.techStack.infrastructure.join(', ')}
Databases: ${p.techStack.databases.join(', ')}

Links:
GitHub: ${p.links.github ?? 'N/A'}
Demo: ${p.links.liveDemo ?? 'N/A'}
`
    };
  });

  // Generate dynamic skills files
  const skillFiles: Record<string, any> = {};
  skillsData.forEach(s => {
    const slug = s.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
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
  experienceData.forEach(e => {
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
${e.keyAchievements.map(a => `- ${a}`).join('\n')}

## Impact Metrics
${e.impactMetrics.map(m => `* ${m}`).join('\n')}

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
                content: JSON.stringify({
                  email: profileData.email,
                  github: profileData.github,
                  linkedin: profileData.linkedin,
                  twitter: profileData.twitter,
                  gpg: profileData.gpgKeyFingerprint
                }, null, 2)
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
                children: projectFiles
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
          zsh: { name: 'zsh', type: 'file', permissions: '-rwxr-xr-x', content: 'ELF 64-bit LSB executable, x86-64' },
          ls: { name: 'ls', type: 'file', permissions: '-rwxr-xr-x', content: 'ELF 64-bit LSB executable, x86-64' },
          cat: { name: 'cat', type: 'file', permissions: '-rwxr-xr-x', content: 'ELF 64-bit LSB executable, x86-64' }
        }
      }
    }
  };

  return root;
}
