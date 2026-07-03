interface GeneratedFile {
  filename: string;
  content: string;
}

export default function getGeneratedFiles(
  content: string
): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  const regex =
    /FILE:\s*(.+?)\n```(?:\w+)?\n([\s\S]*?)```/g;

  let match;

  while ((match = regex.exec(content)) !== null) {
    files.push({
      filename: match[1].trim(),
      content: match[2].trim(),
    });
  }

  return files;
}