import type { Blog } from 'contentlayer/generated'

const isProduction = process.env.NODE_ENV === 'production'

export function isDraft(post: Pick<Blog, 'draft'>) {
  return post.draft === true
}

export function isVisiblePost(post: Pick<Blog, 'draft'>) {
  return !isProduction || !isDraft(post)
}

export function filterVisiblePosts<T extends Pick<Blog, 'draft'>>(posts: T[]) {
  return posts.filter(isVisiblePost)
}

export function shouldShowDraftIndicator(post: Pick<Blog, 'draft'>) {
  return !isProduction && isDraft(post)
}
