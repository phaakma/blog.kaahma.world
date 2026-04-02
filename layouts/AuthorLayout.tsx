import { ReactNode } from 'react'
import NextImage from 'next/image'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

type CredentialBadge = {
  name: string
  url: string
  image: string
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content
  const credentials = (content.credentials as CredentialBadge[] | undefined) ?? []

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
            About
          </h1>
        </div>
        <div className="pt-8 pb-8">
          <div className="mx-auto flex flex-col items-center gap-6 lg:w-fit lg:flex-row lg:items-center lg:justify-center">
            {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="pb-2 text-2xl leading-8 font-bold tracking-tight">{name}</h3>
              <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
              <div className="text-gray-500 dark:text-gray-400">{company}</div>
              <div className="flex space-x-3 pt-5">
                <SocialIcon kind="mail" href={`mailto:${email}`} />
                <SocialIcon kind="github" href={github} />
                <SocialIcon kind="linkedin" href={linkedin} />
                <SocialIcon kind="x" href={twitter} />
                <SocialIcon kind="bluesky" href={bluesky} />
              </div>
            </div>
          </div>
          {credentials.length > 0 && (
            <div className="mt-8">
              <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {credentials.map((badge) => (
                  <li key={badge.url} className="w-18 sm:w-20 lg:w-26">
                    <a
                      href={badge.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View credential: ${badge.name}`}
                      className="block overflow-hidden rounded-md border border-gray-200 bg-white transition hover:-translate-y-0.5 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800"
                    >
                      <NextImage
                        src={badge.image}
                        alt={badge.name}
                        width={128}
                        height={128}
                        className="h-auto w-full"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="prose dark:prose-invert max-w-none pt-8">{children}</div>
        </div>
      </div>
    </>
  )
}
