import { PortableText } from '@portabletext/react'

interface PortableTextProps {
  content: any
  className?: string
}

export function PortableTextBlock({ content, className }: PortableTextProps) {
  if (!content) return null
  
  return (
    <div className={className}>
      <PortableText
        value={content}
        components={{
          block: {
            normal: ({ children }) => <p className="mb-4">{children}</p>,
            h1: ({ children }) => <h1 className="text-2xl font-bold mb-4">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-bold mb-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-bold mb-2">{children}</h3>,
          },
          marks: {
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
          },
        }}
      />
    </div>
  )
}

// Helper to convert portable text to plain text (for simple cases)
export function portableTextToPlainText(blocks: any[]): string {
  if (!blocks || !Array.isArray(blocks)) return ''
  
  return blocks
    .map((block: any) => {
      if (block._type !== 'block' || !block.children) return ''
      return block.children.map((child: any) => child.text).join('')
    })
    .join('\n\n')
}

