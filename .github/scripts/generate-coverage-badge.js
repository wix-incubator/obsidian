'use strict';

const fs = require('fs');
const path = require('path');

const SUMMARY_PATH = path.join(
  __dirname,
  '../../packages/react-obsidian/coverage/coverage-summary.json'
);
const OUTPUT_PATH = path.join(__dirname, '../../coverage-badge.svg');

function getColor(pct) {
  if (pct >= 90) return '#4c1';
  if (pct >= 80) return '#97ca00';
  if (pct >= 70) return '#a4a61d';
  if (pct >= 60) return '#dfb317';
  if (pct >= 50) return '#fe7d37';
  return '#e05d44';
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Approximate text width for Verdana 11px (monospace approximation: ~6.5px per char)
function textWidth(str) {
  return Math.round(str.length * 6.5 + 10);
}

function generateBadge(label, value, color) {
  const labelW = textWidth(label);
  const valueW = textWidth(value);
  const totalW = labelW + valueW;
  const labelX = Math.round(labelW / 2);
  const valueX = labelW + Math.round(valueW / 2);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="20">
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <clipPath id="r">
    <rect width="${totalW}" height="20" rx="3" fill="#fff"/>
  </clipPath>
  <g clip-path="url(#r)">
    <rect width="${labelW}" height="20" fill="#555"/>
    <rect x="${labelW}" width="${valueW}" height="20" fill="${escapeXml(color)}"/>
    <rect width="${totalW}" height="20" fill="url(#s)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
    <text x="${labelX}" y="15" fill="#010101" fill-opacity=".3">${escapeXml(label)}</text>
    <text x="${labelX}" y="14">${escapeXml(label)}</text>
    <text x="${valueX}" y="15" fill="#010101" fill-opacity=".3">${escapeXml(value)}</text>
    <text x="${valueX}" y="14">${escapeXml(value)}</text>
  </g>
</svg>`;
}

const summary = JSON.parse(fs.readFileSync(SUMMARY_PATH, 'utf8'));
const pct = summary.total.lines.pct;
const color = getColor(pct);
const value = `${Math.round(pct)}%`;

const svg = generateBadge('coverage', value, color);
fs.writeFileSync(OUTPUT_PATH, svg, 'utf8');

console.log(`Coverage badge written to ${OUTPUT_PATH} (${value})`);
