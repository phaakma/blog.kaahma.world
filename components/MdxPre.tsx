import { Children, isValidElement, ReactNode } from 'react'
import Pre from 'pliny/ui/Pre'
import Mermaid from './Mermaid'

function textFromNode(node: ReactNode): string {
  if (typeof node === 'string') {
    return node
  }

  if (typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map((child) => textFromNode(child)).join('')
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textFromNode(node.props.children)
  }

  return ''
}

export default function MdxPre(props: React.ComponentProps<'pre'>) {
  const child = Children.toArray(props.children)[0]

  if (isValidElement<{ className?: string; children?: ReactNode }>(child)) {
    const className = child.props.className || ''
    if (className.includes('language-mermaid')) {
      return <Mermaid chart={textFromNode(child.props.children)} />
    }
  }

  const { children, ...rest } = props
  return <Pre {...rest}>{children}</Pre>
}
