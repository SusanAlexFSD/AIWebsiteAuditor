# Database Design

## User

- id
- email
- createdAt

## Audit

- id
- userId
- websiteUrl
- overallScore
- createdAt

## Page

- id
- auditId
- pageUrl

## Issue

- id
- pageId
- category
- severity
- description

## Report

- id
- auditId
- aiSummary