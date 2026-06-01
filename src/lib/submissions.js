import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILES = {
  installation: path.join(DATA_DIR, 'installation-submissions.json'),
  itSupport: path.join(DATA_DIR, 'it-support-submissions.json'),
};

async function ensureDataFile(filePath) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, '[]', 'utf-8');
  }
}

async function readSubmissions(filePath) {
  await ensureDataFile(filePath);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw);
}

async function addSubmission(filePath, data) {
  const submissions = await readSubmissions(filePath);
  const submission = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'pending',
    ...data,
  };
  submissions.unshift(submission);
  await fs.writeFile(filePath, JSON.stringify(submissions, null, 2), 'utf-8');
  return submission;
}

export async function addInstallationSubmission(data) {
  return addSubmission(FILES.installation, data);
}

export async function addItSupportSubmission(data) {
  return addSubmission(FILES.itSupport, data);
}

export async function getInstallationSubmissions() {
  return readSubmissions(FILES.installation);
}

export async function getItSupportSubmissions() {
  return readSubmissions(FILES.itSupport);
}

export async function getAllSubmissions() {
  const [installation, itSupport] = await Promise.all([
    getInstallationSubmissions(),
    getItSupportSubmissions(),
  ]);
  return { installation, itSupport };
}
