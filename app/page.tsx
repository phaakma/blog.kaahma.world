import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { filterVisiblePosts } from '@/lib/posts'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(filterVisiblePosts(allBlogs))
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
