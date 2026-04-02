import TOCInline from 'pliny/ui/TOCInline'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import MdxPre from './MdxPre'
import TableWrapper from './TableWrapper'
import YouTube from './YouTube'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: MdxPre,
  table: TableWrapper,
  BlogNewsletterForm,
  YouTube,
}
