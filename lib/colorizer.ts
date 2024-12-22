export function colorize(text: string, color: string, isUrl: boolean): string {
  const colors: { [key: string]: string } = {
    red: 'text-[#f38ba8]',
    green: 'text-[#a6e3a1]',
    blue: 'text-[#89b4fa]',
    yellow: 'text-[#f9e2af]',
    lavender: 'text-[#b4befe]',
  };

  if (isUrl) {
    return `<a href="${text}" target="_blank" class="${colors[color] || ''}">${text}</a>`;
  }

  return `<span class="${colors[color] || ''}">${text}</span>`;
}

